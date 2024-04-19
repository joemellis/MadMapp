// index.js

function showLoginPopup() {
    document.getElementById('loginPopup').style.display = 'flex';
}

function closeLoginPopup() {
    document.getElementById('loginPopup').style.display = 'none';
}

function showSignupPopup() {
    closeLoginPopup(); // Close the login popup if open
    document.getElementById('signupPopup').style.display = 'flex';
}

function closeSignupPopup() {
    document.getElementById('signupPopup').style.display = 'none';
}

function toggleDropdown() {
    const dropdownOptions = document.getElementById('dropdownOptions');
    dropdownOptions.style.display = (dropdownOptions.style.display === 'flex') ? 'none' : 'flex';
}

// Function to handle login form submission
function login(event) {
    event.preventDefault();

    // Get values from the login form
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Add login verification logic here
    // For example,send the data to the server and verify credentials

    // For now, let's just log the values to the console
    console.log('Login:', username, password);

    // Close the login popup
    closeLoginPopup();
}

// Function to handle signup form submission
function signup(event) {
    event.preventDefault();

    // Get values from the signup form
    var signupUsername = document.getElementById('signupUsername').value;
    var signupPassword = document.getElementById('signupPassword').value;

    // Add signup verification logic here
    // For example, send the data to the server and create a new user

    // For now, let's just log the values to the console
    console.log('Signup:', signupUsername, signupPassword);

    // Close the signup popup
    closeSignupPopup();
}


//error handelin and form validation

function validateLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username === '' || password === '') {
        document.getElementById('loginError').innerHTML = 'Please enter both username and password.';
        return false; // Prevent form submission
    }

    // Other validation logic if needed

    return true; // Allow form submission
}

function validateSignup() {
    var signupUsername = document.getElementById('signupUsername').value;
    var signupPassword = document.getElementById('signupPassword').value;

    if (signupUsername === '' || signupPassword === '') {
        document.getElementById('signupError').innerHTML = 'Please enter both username and password.';
        return false; // Prevent form submission
    }

    // Other validation logic if needed

    return true; // Allow form submission
}
