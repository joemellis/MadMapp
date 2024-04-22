// Function to show login popup
function showLoginPopup() {
    document.getElementById('loginPopup').style.display = 'flex';
}

// Function to show signup popup
function showSignupPopup() {
    document.getElementById('signupPopup').style.display = 'flex';
}

// Function to close popup
function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

// Function to toggle dropdown
function toggleDropdown() {
    const dropdownOptions = document.getElementById('dropdownOptions');
    dropdownOptions.style.display = (dropdownOptions.style.display === 'flex') ? 'none' : 'flex';
}

// Function to handle login
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

// Function to handle signup
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

// Function to handle successful geolocation request
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

// Event listener to check for user profile latitude and longitude on page load
document.addEventListener('DOMContentLoaded', function() {
    const latitude = '{{ user_profile.latitude }}'; // Ensure correct variable name
    const longitude = '{{ user_profile.longitude }}'; // Ensure correct variable name

    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);

    if (latitude && longitude) {
        updateMap(latitude, longitude);
    } else {
        // If latitude and longitude are not available, get the user's location
        getLocation();
    }
});

// Function to handle errors in geolocation request
function handleError(error) {
    console.error('Error getting location:', error.message);
    // Display an error message to the user
    alert('Error getting your location. Please try again later.');
}

// Function to update Google Maps iframe src with latitude and longitude
function updateMap(latitude, longitude) {
    // Construct the Google Maps URL with latitude and longitude, including the API key
    const googleMapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDUkEeZw1XQwyc8MUk63xeghTnfe1PiioU&q=${latitude},${longitude}`;

    // Set the src attribute of the Google Maps iframe
    document.getElementById('googleMap').src = googleMapSrc;
}

// Event listener to check for user profile latitude and longitude on page load
document.addEventListener('DOMContentLoaded', function() {
    const latitude = '{{ UserProfile.latitude }}';
    const longitude = '{{ UserProfile.longitude }}';

    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);

    if (latitude && longitude) {
        updateMap(latitude, longitude);
    } else {
        // If latitude and longitude are not available, get the user's location
        getLocation();
    }
});


// Function to update Google Maps iframe src with latitude and longitude
function updateMap(latitude, longitude) {
    // Construct the Google Maps URL with latitude and longitude, including the API key
    const googleMapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDUkEeZw1XQwyc8MUk63xeghTnfe1PiioU&q=${latitude},${longitude}`;

    // Set the src attribute of the Google Maps iframe
    document.getElementById('googleMap').src = googleMapSrc;
}


