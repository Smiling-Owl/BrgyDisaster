// User Report History - Dynamic data loading and filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const reportGrid = document.getElementById('report-grid');
    const totalCount = document.getElementById('total-count');
    const pendingCount = document.getElementById('pending-count');
    const verifiedCount = document.getElementById('verified-count');
    const dismissedCount = document.getElementById('dismissed-count');

    // Initialize data manager and load reports
    if (window.reportDataManager) {
        // Clear existing data and create fresh test data
        console.log('User Report History: Clearing existing data and creating fresh test reports...');
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
        
        console.log('User Report History: Created test reports:', testReports.map(r => ({ id: r.id, type: r.incidentType, status: r.status })));
        
        loadReports();
    }

    // Load reports from data manager
    function loadReports() {
        const reports = window.reportDataManager.getAllReports();
        renderReports(reports);
        updateStats();
    }

    // Render reports in the grid
    function renderReports(reports) {
        if (!reportGrid) return;

        reportGrid.innerHTML = '';
        
        reports.forEach(report => {
            const reportCard = createReportCard(report);
            reportGrid.appendChild(reportCard);
        });
    }

    // Create a report card element
    function createReportCard(report) {
        const card = document.createElement('div');
        card.className = `report-card ${report.status}`;
        card.setAttribute('data-status', report.status);
        card.setAttribute('data-report-id', report.id);

        const urgencyText = report.urgency && report.urgency.length > 0 
            ? report.urgency.join(', ') 
            : 'None';

        card.innerHTML = `
            <div class="card-header">
                <span class="status-badge ${report.status}">${report.status.charAt(0).toUpperCase() + report.status.slice(1)}</span>
                <span class="report-id">${report.id}</span>
            </div>
            <div class="card-content">
                <h4>${getIncidentTypeDisplay(report.incidentType)} - ${report.location}</h4>
                <p class="location">📍 ${report.location}</p>
                <p class="reporter">👤 ${report.name}</p>
                <p class="date">📅 ${report.submittedDate} - ${report.submittedTime}</p>
                <p class="severity">⚠️ Severity: ${report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}</p>
                <p class="urgency">🚨 Urgency: ${urgencyText}</p>
            </div>
            <div class="card-actions">
                <span class="status-text">${getStatusText(report.status)}</span>
            </div>
        `;

        return card;
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

    // Get status text for display
    function getStatusText(status) {
        const statusMap = {
            'pending': 'Under Review',
            'verified': 'Verified',
            'dismissed': 'Dismissed'
        };
        return statusMap[status] || status;
    }

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterReports(filter);
        });
    });

    // Filter reports based on status
    function filterReports(status) {
        const reports = window.reportDataManager.getReportsByStatus(status);
        renderReports(reports);
        updateStats();
    }

    // Update statistics
    function updateStats() {
        const stats = window.reportDataManager.getStats();
        
        if (totalCount) totalCount.textContent = stats.total;
        if (pendingCount) pendingCount.textContent = stats.pending;
        if (verifiedCount) verifiedCount.textContent = stats.verified;
        if (dismissedCount) dismissedCount.textContent = stats.dismissed;
    }

    // Initialize with all reports
    filterReports('all');
});





