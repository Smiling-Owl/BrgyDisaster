// Admin Home Page functionality
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');
    const navLinks = document.querySelectorAll('.nav-link');
    const welcomeTitle = document.querySelector('.welcome-title');

    // Personalize welcome with logged-in username
    try {
        const name = sessionStorage.getItem('currentUsername') || localStorage.getItem('currentUsername') || 'Admin';
        if (welcomeTitle && name) {
            welcomeTitle.textContent = `Welcome, ${name}`;
        }
    } catch (e) {}

    // Handle logout button click
    logoutBtn.addEventListener('click', function() {
        // Show confirmation dialog
        if (confirm('Are you sure you want to log out?')) {
            // Show loading state
            logoutBtn.textContent = 'Logging out...';
            logoutBtn.disabled = true;
            
            // Simulate logout process
            setTimeout(() => {
                // Clear any stored admin session data
                localStorage.removeItem('adminLoggedIn');
                sessionStorage.removeItem('adminLoggedIn');
                localStorage.removeItem('currentUsername');
                sessionStorage.removeItem('currentUsername');
                
                // Show success message
                showMessage('Logged out successfully!', 'success');
                
                // Redirect to login page after a short delay
                setTimeout(() => {
                    window.location.href = 'admin.html';
                }, 1500);
            }, 1000);
        }
    });

    // Handle navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Handle specific navigation
            const href = this.getAttribute('href');
            
            if (href === '#') {
                e.preventDefault();
                
                // Handle Dashboard click
                if (this.textContent.trim() === 'Dashboard') {
                    showMessage('Dashboard functionality coming soon!', 'info');
                }
                // Handle Summary click
                else if (this.textContent.trim() === 'Summary') {
                    showMessage('Summary functionality coming soon!', 'info');
                }
            }
            // Report link will navigate to report.html
        });
    });

    // Add hover effects to logout button
    logoutBtn.addEventListener('mouseenter', function() {
        if (!this.disabled) {
            this.style.transform = 'translateY(-3px)';
        }
    });

    logoutBtn.addEventListener('mouseleave', function() {
        if (!this.disabled) {
            this.style.transform = 'translateY(0)';
        }
    });

    // Add keyboard support for logout
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Escape key to logout (with confirmation)
            if (confirm('Press OK to log out, or Cancel to stay logged in.')) {
                logoutBtn.click();
            }
        }
    });

    // Show message function
    function showMessage(message, type) {
        // Remove existing message if any
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        messageDiv.textContent = message;
        
        // Style the message
        const colors = {
            success: '#4CAF50',
            error: '#f44336',
            info: '#2196F3',
            warning: '#FF9800'
        };
        
        messageDiv.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: ${colors[type] || colors.info};
            color: white;
            padding: 15px 30px;
            border-radius: 25px;
            font-weight: bold;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            animation: slideDown 0.3s ease-out;
            max-width: 90%;
            text-align: center;
        `;
        
        // Add animation keyframes if not already added
        if (!document.querySelector('#message-animations')) {
            const style = document.createElement('style');
            style.id = 'message-animations';
            style.textContent = `
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateX(-50%) translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(-50%) translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add to page
        document.body.appendChild(messageDiv);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.style.animation = 'slideDown 0.3s ease-out reverse';
                setTimeout(() => {
                    if (messageDiv.parentNode) {
                        messageDiv.parentNode.removeChild(messageDiv);
                    }
                }, 300);
            }
        }, 3000);
    }

    // Check if admin is logged in (basic check)
    if (!localStorage.getItem('adminLoggedIn') && !sessionStorage.getItem('adminLoggedIn')) {
        // If not logged in, redirect to admin login
        showMessage('Please log in to access admin area', 'error');
        setTimeout(() => {
            window.location.href = 'admin.html';
        }, 2000);
    }

    // Add some visual feedback to navigation links
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px)';
            }
        });

        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    // Welcome message on page load
    setTimeout(() => {
        showMessage('Welcome to the Admin Dashboard!', 'success');
    }, 500);
});
