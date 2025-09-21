document.addEventListener('DOMContentLoaded', function() {
    const adminForm = document.getElementById('adminForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.querySelector('.login-btn');

    if (!adminForm || !usernameInput || !passwordInput || !loginBtn) return;

    adminForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        if (!username || !password) {
            showMessage('Please fill in all fields', 'error');
            return;
        }
        localStorage.setItem('adminLoggedIn', 'true');
        sessionStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('currentUsername', username);
        sessionStorage.setItem('currentUsername', username);
        window.location.href = 'adminHome.html';
    });

    [usernameInput, passwordInput].forEach(input => {
        input.addEventListener('focus', function() { this.parentElement.classList.add('focused'); });
        input.addEventListener('blur', function() { this.parentElement.classList.remove('focused'); });
    });

    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') adminForm.dispatchEvent(new Event('submit'));
    });

    function showMessage(message, type) {
        const existingMessage = document.querySelector('.message');
        if (existingMessage) existingMessage.remove();
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `position: fixed; top: 100px; left: 50%; transform: translateX(-50%); background: ${type === 'success' ? '#4CAF50' : '#f44336'}; color: white; padding: 15px 30px; border-radius: 25px; font-weight: bold; z-index: 1000; box-shadow: 0 4px 15px rgba(0,0,0,0.3); animation: slideDown 0.3s ease-out;`;
        if (!document.querySelector('#message-animations')) {
            const style = document.createElement('style');
            style.id = 'message-animations';
            style.textContent = `@keyframes slideDown { from { opacity: 0; transform: translateX(-50%) translateY(-20px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }`;
            document.head.appendChild(style);
        }
        document.body.appendChild(messageDiv);
        setTimeout(() => {
            messageDiv.style.animation = 'slideDown 0.3s ease-out reverse';
            setTimeout(() => { if (messageDiv.parentNode) messageDiv.parentNode.removeChild(messageDiv); }, 300);
        }, 3000);
    }
});
