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

    // Add your login verification logic here
    // For example, you can send the data to the server and verify credentials

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

    // Add your signup verification logic here
    // For example, you can send the data to the server and create a new user

    // For now, let's just log the values to the console
    console.log('Signup:', signupUsername, signupPassword);

    // Close the signup popup
    closeSignupPopup();
}