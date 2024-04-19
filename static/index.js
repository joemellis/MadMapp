function showLoginPopup() {
    document.getElementById('loginPopup').style.display = 'flex';
}

function showSignupPopup() {
    document.getElementById('signupPopup').style.display = 'flex';
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

function toggleDropdown() {
    const dropdownOptions = document.getElementById('dropdownOptions');
    dropdownOptions.style.display = (dropdownOptions.style.display === 'flex') ? 'none' : 'flex';
}

function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send login request to server
    fetch('/accounts/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.ok) {
            closePopup('loginPopup');
            window.location.href = '/userprofile'; // Redirect to userprofile after successful login
        } else {
            response.json().then(data => {
                document.getElementById('loginError').textContent = data.non_field_errors || 'An error occurred.';
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function signup(event) {
    event.preventDefault();
    const signupUsername = document.getElementById('signupUsername').value;
    const signupPassword = document.getElementById('signupPassword').value;

    // Send signup request to server
    fetch('/accounts/signup/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({ username: signupUsername, password: signupPassword })
    })
    .then(response => {
        if (response.ok) {
            closePopup('signupPopup');
            window.location.href = '/userprofile'; // Redirect to userprofile after successful signup
        } else {
            response.json().then(data => {
                document.getElementById('signupError').textContent = data.username || 'An error occurred.';
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to get CSRF token from cookies
function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

document.getElementById('loginForm').addEventListener('submit', login);
document.getElementById('signupForm').addEventListener('submit', signup);
