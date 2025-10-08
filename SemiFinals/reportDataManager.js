// Shared data management system for reports
class ReportDataManager {
    constructor() {
        this.storageKey = 'disasterReports';
        this.reports = this.loadReports();
    }

    // Load reports from localStorage
    loadReports() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading reports:', error);
            return [];
        }
    }

    // Save reports to localStorage
    saveReports() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.reports));
        } catch (error) {
            console.error('Error saving reports:', error);
        }
    }

    // Generate unique report ID
    generateReportId() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `#${String(timestamp).slice(-6)}${String(random).padStart(3, '0')}`;
    }

    // Add a new report
    addReport(reportData) {
        const newReport = {
            id: this.generateReportId(),
            ...reportData,
            status: 'pending',
            submittedAt: new Date().toISOString(),
            submittedDate: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }),
            submittedTime: new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            })
        };

        this.reports.unshift(newReport); // Add to beginning of array
        this.saveReports();
        return newReport;
    }

    // Get all reports
    getAllReports() {
        return [...this.reports];
    }

    // Get reports by status
    getReportsByStatus(status) {
        if (status === 'all') {
            return this.getAllReports();
        }
        return this.reports.filter(report => report.status === status);
    }

    // Get reports by user (if we had user authentication)
    getUserReports(userId) {
        return this.reports.filter(report => report.userId === userId);
    }

    // Update report status
    updateReportStatus(reportId, newStatus) {
        const report = this.reports.find(r => r.id === reportId);
        if (report) {
            report.status = newStatus;
            report.updatedAt = new Date().toISOString();
            this.saveReports();
            return true;
        }
        return false;
    }

    // Get report by ID
    getReportById(reportId) {
        return this.reports.find(r => r.id === reportId);
    }

    // Get statistics
    getStats() {
        const total = this.reports.length;
        const pending = this.reports.filter(r => r.status === 'pending').length;
        const verified = this.reports.filter(r => r.status === 'verified').length;
        const dismissed = this.reports.filter(r => r.status === 'dismissed').length;

        return {
            total,
            pending,
            verified,
            dismissed
        };
    }

    // Initialize with sample data if no reports exist
    initializeSampleData() {
        // Only initialize if no reports exist AND localStorage is empty
        const stored = localStorage.getItem(this.storageKey);
        if (this.reports.length === 0 && !stored) {
            const sampleReports = [
                {
                    id: '#001',
                    name: 'Juan Dela Cruz',
                    contact: '09123456789',
                    location: 'Barangay Center, Manila',
                    incidentType: 'flood',
                    severity: 'high',
                    description: 'Heavy flooding in the barangay center area due to continuous rain. Water level is rising rapidly.',
                    witnesses: 15,
                    urgency: ['immediate', 'evacuation'],
                    status: 'pending',
                    submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                    submittedDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    }),
                    submittedTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    })
                },
                {
                    id: '#002',
                    name: 'Maria Santos',
                    contact: 'maria.santos@email.com',
                    location: 'Subdivision Area, Quezon City',
                    incidentType: 'fire',
                    severity: 'critical',
                    description: 'Fire incident in residential area. Multiple houses affected. Immediate response needed.',
                    witnesses: 8,
                    urgency: ['immediate', 'medical', 'evacuation'],
                    status: 'pending',
                    submittedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
                    submittedDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    }),
                    submittedTime: new Date(Date.now() - 1 * 60 * 60 * 1000).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    })
                },
                {
                    id: '#003',
                    name: 'Pedro Rodriguez',
                    contact: '09187654321',
                    location: 'Main Street, Makati',
                    incidentType: 'other',
                    severity: 'medium',
                    description: 'Road damage on main street causing traffic issues. Needs immediate repair.',
                    witnesses: 3,
                    urgency: ['immediate'],
                    status: 'pending',
                    submittedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
                    submittedDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    }),
                    submittedTime: new Date(Date.now() - 3 * 60 * 60 * 1000).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    })
                },
                {
                    id: '#004',
                    name: 'Ana Garcia',
                    contact: 'ana.garcia@email.com',
                    location: 'Public Market, Taguig',
                    incidentType: 'fire',
                    severity: 'high',
                    description: 'Fire incident at public market. Fire department responded quickly.',
                    witnesses: 25,
                    urgency: ['immediate', 'evacuation'],
                    status: 'verified',
                    submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                    submittedDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    }),
                    submittedTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    })
                },
                {
                    id: '#005',
                    name: 'Carlos Mendoza',
                    contact: '09123456788',
                    location: 'Residential Area, Pasig',
                    incidentType: 'flood',
                    severity: 'medium',
                    description: 'Water supply interruption affecting multiple households.',
                    witnesses: 12,
                    urgency: ['immediate'],
                    status: 'verified',
                    submittedAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
                    submittedDate: new Date(Date.now() - 36 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    }),
                    submittedTime: new Date(Date.now() - 36 * 60 * 60 * 1000).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    })
                },
                {
                    id: '#006',
                    name: 'Lisa Cruz',
                    contact: 'lisa.cruz@email.com',
                    location: 'EDSA, Mandaluyong',
                    incidentType: 'other',
                    severity: 'low',
                    description: 'Traffic accident on EDSA. Minor injuries reported.',
                    witnesses: 5,
                    urgency: ['medical'],
                    status: 'verified',
                    submittedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
                    submittedDate: new Date(Date.now() - 48 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    }),
                    submittedTime: new Date(Date.now() - 48 * 60 * 60 * 1000).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    })
                }
            ];

            this.reports = sampleReports;
            this.saveReports();
        }
    }
}

// Create global instance
window.reportDataManager = new ReportDataManager();
