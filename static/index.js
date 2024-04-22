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


// Function to handle the click event of the button
document.getElementById('getLocationButton').addEventListener('click', getLocation);

// Function to get the user's geolocation
function getLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
        alert('Geolocation is not supported by your browser');
    }
}

function handleSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    updateMap(latitude, longitude);

    // Send latitude and longitude to the server to update the user profile
    fetch('/update_location/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({ latitude, longitude })
    })
    .then(response => {
        if (!response.ok) {
            console.error('Failed to update location');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


// Function to update Google Maps iframe src with latitude and longitude
function updateMap(latitude, longitude) {
    // Construct the Google Maps URL with latitude and longitude, including the API key
    const googleMapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDUkEeZw1XQwyc8MUk63xeghTnfe1PiioU&q=${latitude},${longitude}`;

    // Set the src attribute of the Google Maps iframe
    document.getElementById('googleMap').src = googleMapSrc;
}

// Function to handle errors in geolocation request
function handleError(error) {
    console.error('Error getting location:', error.message);
    // Display an error message to the user
    alert('Error getting your location. Please try again later.');
}

document.addEventListener('DOMContentLoaded', function() {
    const latitude = '{{ user_profile.latitude }}';
    const longitude = '{{ user_profile.longitude }}';

    if (latitude && longitude) {
        updateMap(latitude, longitude);
    } else {
        document.getElementById('getLocationButton').style.display = 'block';
        document.getElementById('getLocationButton').addEventListener('click', getLocation);
    }
});

