// Report form submission and popup functionality
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reportForm');
    const popupModal = document.getElementById('popupModal');
    const confirmYesBtn = document.getElementById('confirmYes');
    const confirmNoBtn = document.getElementById('confirmNo');
    const submitBtn = document.querySelector('.btn-primary');

    // Initialize sample data if needed
    if (window.reportDataManager) {
        window.reportDataManager.initializeSampleData();
    }

    // Handle form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Show the popup modal
            popupModal.style.display = 'block';
            
            // Add a subtle animation effect
            setTimeout(() => {
                popupModal.style.opacity = '1';
            }, 10);
        });
    }

    // Handle "Yes" button click
    if (confirmYesBtn) {
        confirmYesBtn.addEventListener('click', function() {
            // Collect form data
            const formData = {
                name: document.getElementById('name')?.value.trim(),
                contact: document.getElementById('contact')?.value.trim(),
                location: document.getElementById('location')?.value.trim(),
                incidentType: document.getElementById('incident-type')?.value,
                severity: document.querySelector('input[name="severity"]:checked')?.value,
                description: document.getElementById('description')?.value.trim(),
                witnesses: parseInt(document.getElementById('witnesses')?.value) || 0,
                urgency: Array.from(document.querySelectorAll('input[name="urgency"]:checked')).map(cb => cb.value)
            };

            // Validate required fields
            if (!formData.name || !formData.contact || !formData.location || 
                !formData.incidentType || !formData.severity || !formData.description) {
                alert('Please fill in all required fields.');
                popupModal.style.display = 'none';
                return;
            }

            // Save report using the data manager
            if (window.reportDataManager) {
                const newReport = window.reportDataManager.addReport(formData);
                
                // Hide the popup
                popupModal.style.display = 'none';
                
                // Show success message with report ID
                alert(`Report submitted successfully!\nReport ID: ${newReport.id}\nThank you for your feedback.`);
                
                // Reset the form
                if (form) {
                    form.reset();
                }
            } else {
                alert('Error: Unable to save report. Please try again.');
                popupModal.style.display = 'none';
            }
        });
    }

    // Handle "No/Go Back" button click
    if (confirmNoBtn) {
        confirmNoBtn.addEventListener('click', function() {
            // Hide the popup
            popupModal.style.display = 'none';
            
            // Focus back to the form
            const nameInput = document.getElementById('name');
            if (nameInput) {
                nameInput.focus();
            }
        });
    }

    // Close popup when clicking outside of it
    if (popupModal) {
        popupModal.addEventListener('click', function(e) {
            if (e.target === popupModal) {
                popupModal.style.display = 'none';
            }
        });
    }

    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupModal && popupModal.style.display === 'block') {
            popupModal.style.display = 'none';
        }
    });

    // Add visual feedback to buttons
    if (submitBtn) {
        submitBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        submitBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
});

// Clear form function
function clearForm() {
    const form = document.getElementById('reportForm');
    if (form) {
        form.reset();
        // Clear any custom styling or validation states
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.style.borderColor = '#dadce0';
        });
    }
}
