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
            
            // Show success message
            alert('Report submitted successfully! Thank you for your feedback.');
            
            // Reset the form
            if (form) {
                form.reset();
            }
            
            // Log form data
            console.log('Form submitted with data:', {
                name: document.getElementById('name')?.value,
                contact: document.getElementById('contact')?.value,
                location: document.getElementById('location')?.value,
                incidentType: document.getElementById('incident-type')?.value,
                severity: document.querySelector('input[name="severity"]:checked')?.value,
                description: document.getElementById('description')?.value,
                witnesses: document.getElementById('witnesses')?.value,
                urgency: Array.from(document.querySelectorAll('input[name="urgency"]:checked')).map(cb => cb.value)
            });
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
