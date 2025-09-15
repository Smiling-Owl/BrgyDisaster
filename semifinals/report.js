// Report form submission and popup functionality
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const popupModal = document.getElementById('popupModal');
    const confirmYesBtn = document.getElementById('confirmYes');
    const confirmNoBtn = document.getElementById('confirmNo');
    const submitBtn = document.querySelector('.submit-btn');

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Show the popup modal
        popupModal.style.display = 'block';
        
        // Add a subtle animation effect
        setTimeout(() => {
            popupModal.style.opacity = '1';
        }, 10);
    });

    // Handle "Yes" button click
    confirmYesBtn.addEventListener('click', function() {
        // Hide the popup
        popupModal.style.display = 'none';
        
        // Show success message (you can customize this)
        alert('Report submitted successfully! Thank you for your feedback.');
        
        // Reset the form
        form.reset();
        
        // Optional: You can add actual form submission logic here
        // For example, sending data to a server
        console.log('Form submitted with data:', {
            name: document.getElementById('name').value,
            contact: document.getElementById('contact').value,
            location: document.getElementById('location').value,
            description: document.getElementById('description').value
        });
    });

    // Handle "No/Go Back" button click
    confirmNoBtn.addEventListener('click', function() {
        // Hide the popup
        popupModal.style.display = 'none';
        
        // Focus back to the form (optional)
        document.getElementById('name').focus();
    });

    // Close popup when clicking outside of it
    popupModal.addEventListener('click', function(e) {
        if (e.target === popupModal) {
            popupModal.style.display = 'none';
        }
    });

    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupModal.style.display === 'block') {
            popupModal.style.display = 'none';
        }
    });

    // Add some visual feedback to the submit button
    submitBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });

    submitBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});
