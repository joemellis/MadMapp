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
