// Authentication functionality

// Login form handler
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Social auth buttons
    const socialButtons = document.querySelectorAll('.btn-social');
    socialButtons.forEach(button => {
        button.addEventListener('click', handleSocialAuth);
    });
});

function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const remember = formData.get('remember');
    
    // Basic validation
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate login process
    showNotification('Signing in...', 'info');
    
    setTimeout(() => {
        // Simulate successful login
        const user = {
            email: email,
            name: email.split('@')[0],
            loginTime: new Date().toISOString()
        };
        
        // Store user data
        if (remember) {
            localStorage.setItem('yarac_user', JSON.stringify(user));
        } else {
            sessionStorage.setItem('yarac_user', JSON.stringify(user));
        }
        
        showNotification('Login successful! Redirecting...', 'success');
        
        // Redirect to homepage
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
        
    }, 1000);
}

function handleRegister(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const terms = formData.get('terms');
    const newsletter = formData.get('newsletter');
    
    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return;
    }
    
    if (!terms) {
        showNotification('Please accept the Terms & Conditions', 'error');
        return;
    }
    
    // Simulate registration process
    showNotification('Creating your account...', 'info');
    
    setTimeout(() => {
        // Simulate successful registration
        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            name: `${firstName} ${lastName}`,
            newsletter: newsletter,
            registrationTime: new Date().toISOString()
        };
        
        // Store user data
        localStorage.setItem('yarac_user', JSON.stringify(user));
        
        showNotification('Account created successfully! Redirecting...', 'success');
        
        // Redirect to homepage
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
        
    }, 1500);
}

function handleSocialAuth(e) {
    const platform = e.currentTarget.classList.contains('google') ? 'Google' : 'Facebook';
    
    showNotification(`Redirecting to ${platform}...`, 'info');
    
    // In a real application, this would redirect to the OAuth provider
    setTimeout(() => {
        showNotification(`${platform} authentication would be handled here`, 'info');
    }, 1000);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.auth-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `auth-notification ${type}`;
    notification.textContent = message;
    
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        info: '#3498db'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-family: 'League Gothic', sans-serif;
        font-weight: 500;
        letter-spacing: 1px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// Check if user is logged in
function checkAuthStatus() {
    const user = localStorage.getItem('yarac_user') || sessionStorage.getItem('yarac_user');
    
    if (user) {
        const userData = JSON.parse(user);
        updateNavbarForLoggedInUser(userData);
    }
}

function updateNavbarForLoggedInUser(user) {
    const signInBtn = document.querySelector('.sign-in-btn');
    if (signInBtn) {
        signInBtn.textContent = `Hi, ${user.name.split(' ')[0]}`;
        signInBtn.href = '#';
        signInBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showUserMenu();
        });
    }
}

function showUserMenu() {
    // Create user dropdown menu
    const existingMenu = document.querySelector('.user-menu');
    if (existingMenu) {
        existingMenu.remove();
        return;
    }
    
    const menu = document.createElement('div');
    menu.className = 'user-menu';
    menu.innerHTML = `
        <div class="user-menu-item" onclick="viewProfile()">Profile</div>
        <div class="user-menu-item" onclick="viewOrders()">My Orders</div>
        <div class="user-menu-item" onclick="logout()">Logout</div>
    `;
    
    menu.style.cssText = `
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        min-width: 150px;
        overflow: hidden;
    `;
    
    const userMenuItemStyle = `
        .user-menu-item {
            padding: 12px 20px;
            cursor: pointer;
            transition: background 0.3s ease;
            font-family: 'League Gothic', sans-serif;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .user-menu-item:hover {
            background: #f8f9fa;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = userMenuItemStyle;
    document.head.appendChild(style);
    
    const signInBtn = document.querySelector('.sign-in-btn');
    signInBtn.parentElement.style.position = 'relative';
    signInBtn.parentElement.appendChild(menu);
    
    // Close menu when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target) && !signInBtn.contains(e.target)) {
                menu.remove();
                style.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 100);
}

function viewProfile() {
    showNotification('Profile page would be shown here', 'info');
}

function viewOrders() {
    showNotification('Orders page would be shown here', 'info');
}

function logout() {
    localStorage.removeItem('yarac_user');
    sessionStorage.removeItem('yarac_user');
    showNotification('Logged out successfully', 'success');
    
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}

// Initialize auth status check
document.addEventListener('DOMContentLoaded', checkAuthStatus);