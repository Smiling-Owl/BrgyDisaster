// Filter and search functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const reportCards = document.querySelectorAll('.report-card');
    const totalCount = document.getElementById('total-count');
    const pendingCount = document.getElementById('pending-count');
    const verifiedCount = document.getElementById('verified-count');

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
        console.log('Filtering by status:', status);
        reportCards.forEach(card => {
            const cardStatus = card.getAttribute('data-status');
            console.log('Card status:', cardStatus, 'Should show:', status === 'all' || cardStatus === status);
            
            if (status === 'all' || cardStatus === status) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        updateStats();
    }

    // Update statistics
    function updateStats() {
        const visibleCards = Array.from(reportCards).filter(card => card.style.display !== 'none');
        const pendingCards = visibleCards.filter(card => card.getAttribute('data-status') === 'pending');
        const verifiedCards = visibleCards.filter(card => card.getAttribute('data-status') === 'verified');
        
        if (totalCount) totalCount.textContent = visibleCards.length;
        if (pendingCount) pendingCount.textContent = pendingCards.length;
        if (verifiedCount) verifiedCount.textContent = verifiedCards.length;
    }

    // Initialize stats
    updateStats();
});