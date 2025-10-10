// Report form submission and popup functionality
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reportForm');
    const popupModal = document.getElementById('popupModal');
    const confirmYesBtn = document.getElementById('confirmYes');
    const confirmNoBtn = document.getElementById('confirmNo');
    const submitBtn = document.querySelector('.btn-primary');

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
            // Hide the popup
            popupModal.style.display = 'none';

            // Collect form data based on current field IDs
            const name = document.getElementById('reporter-name')?.value || 'Anonymous';
            const barangay = document.getElementById('barangay')?.value || '';
            const location = document.getElementById('location')?.value || '';
            const incidentType = document.getElementById('disaster-category')?.value || 'other';
            const date = document.getElementById('date')?.value || '';
            const time = document.getElementById('time')?.value || '';
            const damageDescription = document.getElementById('damage-description')?.value || '';
            const additionalInfo = document.getElementById('additional-info')?.value || '';
            const evacNeeded = document.querySelector('input[name="evacuation-needed"]:checked')?.value || 'no';
            const affectedIndividuals = parseInt(document.getElementById('affected-individuals')?.value || '0', 10);

            // Build description and urgency
            const descriptionParts = [];
            if (damageDescription) descriptionParts.push(`Damage: ${damageDescription}`);
            if (additionalInfo) descriptionParts.push(`Info: ${additionalInfo}`);
            if (date || time) descriptionParts.push(`When: ${date} ${time}`.trim());
            if (barangay) descriptionParts.push(`Barangay: ${barangay}`);
            const description = descriptionParts.join(' | ');
            const urgency = evacNeeded === 'yes' || evacNeeded === 'partial' ? ['evacuation'] : [];

            // Persist via shared data manager
            let newReport = null;
            if (window.reportDataManager) {
                newReport = window.reportDataManager.addReport({
                    name,
                    contact: '',
                    location,
                    incidentType,
                    severity: 'medium',
                    description,
                    witnesses: isNaN(affectedIndividuals) ? 0 : affectedIndividuals,
                    urgency
                });
            }

            // Show success message
            alert('Report submitted successfully! Thank you for your feedback.');

            // Reset the form
            if (form) {
                form.reset();
            }

            // If a new report was created, go to admin details for that report
            if (newReport && newReport.id) {
                window.location.href = `adminReportDetails.html?id=${encodeURIComponent(newReport.id)}`;
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

