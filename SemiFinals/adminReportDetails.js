// Admin Report Details - Dynamic loading and status management
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const reportId = urlParams.get('id');
    
    // Initialize data manager
    if (window.reportDataManager) {
        // Clear existing data and create fresh test data
        console.log('Clearing existing data and creating fresh test reports...');
        localStorage.removeItem('disasterReports');
        window.reportDataManager.reports = [];
        
        // Create test reports with known data
        const testReports = [
            {
                id: '#950573575',
                name: 'gabss',
                contact: '0129301293',
                location: 'asdasd',
                incidentType: 'fire',
                severity: 'medium',
                description: 'asdasdasd',
                witnesses: 23,
                urgency: ['medical'],
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
            },
            {
                id: '#520954780',
                name: 'gabss',
                contact: '0129301293',
                location: 'asdasd',
                incidentType: 'earthquake',
                severity: 'medium',
                description: 'asdasdasd',
                witnesses: 23,
                urgency: ['medical'],
                status: 'verified',
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
            }
        ];
        
        // Add test reports to data manager
        window.reportDataManager.reports = testReports;
        window.reportDataManager.saveReports();
        
        console.log('Created test reports:', testReports.map(r => ({ id: r.id, type: r.incidentType, status: r.status })));
        
        if (reportId) {
            loadReportDetails(reportId);
        } else {
            // If no report ID provided, show the first available report as fallback
            const allReports = window.reportDataManager.getAllReports();
            if (allReports.length > 0) {
                loadReportDetails(allReports[0].id);
                showFallbackMessage();
            } else {
                showError('No reports available');
            }
        }
    } else {
        showError('Data manager not available');
    }

    // Validate and fix report data
    function validateReportData(report) {
        // Ensure all required fields exist
        if (!report.id) {
            console.error('Report missing ID:', report);
            return false;
        }
        
        // Ensure incident type is valid
        const validIncidentTypes = ['flood', 'fire', 'earthquake', 'typhoon', 'landslide', 'other'];
        if (!validIncidentTypes.includes(report.incidentType)) {
            console.warn('Invalid incident type:', report.incidentType);
            report.incidentType = 'other';
        }
        
        // Ensure severity is valid
        const validSeverities = ['low', 'medium', 'high', 'critical'];
        if (!validSeverities.includes(report.severity)) {
            console.warn('Invalid severity:', report.severity);
            report.severity = 'medium';
        }
        
        // Ensure status is valid
        const validStatuses = ['pending', 'verified', 'dismissed'];
        if (!validStatuses.includes(report.status)) {
            console.warn('Invalid status:', report.status);
            report.status = 'pending';
        }
        
        return true;
    }

    // Load report details
    function loadReportDetails(id) {
        // Clean the ID - ensure it has # prefix
        const cleanId = id.startsWith('#') ? id : `#${id}`;
        
        // Debug: Log all available reports
        const allReports = window.reportDataManager.getAllReports();
        console.log('Loading report details for ID:', cleanId);
        console.log('Available reports:', allReports.map(r => ({ id: r.id, title: `${getIncidentTypeDisplay(r.incidentType)} - ${r.location}` })));
        
        // Try exact match first
        let report = allReports.find(r => r.id === cleanId);
        
        // If not found, try without the # symbol
        if (!report) {
            const idWithoutHash = cleanId.replace('#', '');
            report = allReports.find(r => r.id === idWithoutHash);
        }
        
        // If still not found, try partial matching (last resort)
        if (!report) {
            report = allReports.find(r => 
                r.id.includes(cleanId.replace('#', '')) || 
                cleanId.includes(r.id.replace('#', ''))
            );
        }
        
        console.log('Found report for loading:', report ? { id: report.id, title: `${getIncidentTypeDisplay(report.incidentType)} - ${report.location}` } : null);
        
        if (report) {
            // Validate the report data
            if (validateReportData(report)) {
                displayReportDetails(report);
                setupActionButtons(report);
            } else {
                console.error('Report data validation failed:', report);
                showError('Report data is invalid');
            }
        } else {
            console.error('Report not found for loading. Available IDs:', allReports.map(r => r.id));
            showError(`Report with ID ${cleanId} not found. Available reports: ${allReports.map(r => r.id).join(', ')}`);
        }
    }

    // Display report details
    function displayReportDetails(report) {
        // Update status badge
        const statusBadge = document.getElementById('statusBadge');
        statusBadge.textContent = report.status.charAt(0).toUpperCase() + report.status.slice(1);
        statusBadge.className = `status-badge ${report.status}`;

        // Update report ID
        document.getElementById('reportId').textContent = report.id;

        // Update report title
        const incidentTypeDisplay = getIncidentTypeDisplay(report.incidentType);
        document.getElementById('reportTitle').textContent = `${incidentTypeDisplay} - ${report.location}`;

        // Update personal information
        document.getElementById('reporterName').textContent = report.name;
        document.getElementById('contactInfo').textContent = report.contact;

        // Update incident details
        document.getElementById('location').textContent = report.location;
        document.getElementById('incidentType').textContent = incidentTypeDisplay;
        document.getElementById('severity').textContent = report.severity.charAt(0).toUpperCase() + report.severity.slice(1);
        
        const urgencyText = report.urgency && report.urgency.length > 0 
            ? report.urgency.join(', ') 
            : 'None';
        document.getElementById('urgency').textContent = urgencyText;
        
        document.getElementById('peopleAffected').textContent = report.witnesses || 0;
        document.getElementById('submittedDate').textContent = `${report.submittedDate} - ${report.submittedTime}`;

        // Update description
        document.getElementById('description').textContent = report.description;
    }

    // Setup action buttons based on report status
    function setupActionButtons(report) {
        const verifyBtn = document.getElementById('verifyBtn');
        const dismissBtn = document.getElementById('dismissBtn');
        const actionButtons = document.getElementById('actionButtons');

        // Hide action buttons if report is already processed
        if (report.status === 'verified' || report.status === 'dismissed') {
            actionButtons.style.display = 'none';
            return;
        }

        // Show action buttons for pending reports
        actionButtons.style.display = 'flex';

        // Verify button
        verifyBtn.addEventListener('click', function() {
            showModal('verifyModal');
        });

        // Dismiss button
        dismissBtn.addEventListener('click', function() {
            showModal('dismissModal');
        });
    }

    // Show modal
    function showModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = 'block';
        
        // Add animation
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }

    // Hide modal
    function hideModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.opacity = '0';
        
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    // Setup modal functionality
    function setupModals() {
        // Verify modal
        const verifyModal = document.getElementById('verifyModal');
        const confirmVerifyBtn = document.getElementById('confirmVerify');

        confirmVerifyBtn.addEventListener('click', function() {
            updateReportStatus(reportId, 'verified');
            hideModal('verifyModal');
        });

        // Dismiss modal
        const dismissModal = document.getElementById('dismissModal');
        const confirmDismissBtn = document.getElementById('confirmDismiss');

        confirmDismissBtn.addEventListener('click', function() {
            updateReportStatus(reportId, 'dismissed');
            hideModal('dismissModal');
        });

        // Close buttons
        const closeButtons = document.querySelectorAll('[data-close]');
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.modal');
                hideModal(modal.id);
            });
        });

        // Close on outside click
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    hideModal(this.id);
                }
            });
        });

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                modals.forEach(modal => {
                    if (modal.style.display === 'block') {
                        hideModal(modal.id);
                    }
                });
            }
        });
    }

    // Update report status
    function updateReportStatus(id, newStatus) {
        // Clean the ID - ensure it has # prefix
        const cleanId = id.startsWith('#') ? id : `#${id}`;
        
        // Debug: Log all available reports
        const allReports = window.reportDataManager.getAllReports();
        console.log('Updating report status for ID:', cleanId);
        console.log('Available reports:', allReports.map(r => ({ id: r.id, title: `${getIncidentTypeDisplay(r.incidentType)} - ${r.location}` })));
        
        // Try exact match first
        let report = allReports.find(r => r.id === cleanId);
        
        // If not found, try without the # symbol
        if (!report) {
            const idWithoutHash = cleanId.replace('#', '');
            report = allReports.find(r => r.id === idWithoutHash);
        }
        
        // If still not found, try partial matching (last resort)
        if (!report) {
            report = allReports.find(r => 
                r.id.includes(cleanId.replace('#', '')) || 
                cleanId.includes(r.id.replace('#', ''))
            );
        }
        
        console.log('Found report for update:', report ? { id: report.id, title: `${getIncidentTypeDisplay(report.incidentType)} - ${report.location}` } : null);
        
        if (report) {
            // Update the report status
            report.status = newStatus;
            report.updatedAt = new Date().toISOString();
            window.reportDataManager.saveReports();
            
            // Show success message
            const statusText = newStatus === 'verified' ? 'verified' : 'dismissed';
            alert(`Report has been ${statusText} successfully!`);
            
            // Reload the page to show updated status
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            console.error('Report not found for update. Available IDs:', allReports.map(r => r.id));
            alert(`Error updating report status. Report with ID ${cleanId} not found.`);
        }
    }

    // Get display text for incident type
    function getIncidentTypeDisplay(type) {
        const typeMap = {
            'flood': 'Flooding',
            'fire': 'Fire Incident',
            'earthquake': 'Earthquake',
            'typhoon': 'Typhoon',
            'landslide': 'Landslide',
            'other': 'Other Incident'
        };
        return typeMap[type] || type;
    }

    // Show fallback message when no report ID is provided
    function showFallbackMessage() {
        // Add a subtle notification at the top of the page
        const navbar = document.querySelector('.navbar');
        const notification = document.createElement('div');
        notification.className = 'fallback-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-text">No specific report selected. Showing first available report.</span>
                <a href="adminReports.html" class="notification-link">View All Reports</a>
            </div>
        `;
        
        // Insert after navbar
        navbar.parentNode.insertBefore(notification, navbar.nextSibling);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }

    // Show error message
    function showError(message) {
        const detailsCard = document.getElementById('reportDetailsCard');
        detailsCard.innerHTML = `
            <div class="error-message">
                <h3>Error</h3>
                <p>${message}</p>
                <a href="adminReports.html" class="btn primary">Back to Reports</a>
            </div>
        `;
    }

    // Initialize modals
    setupModals();
});
