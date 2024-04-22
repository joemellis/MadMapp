from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import UserProfile

@login_required
def profile_view(request):
    # Get the UserProfile object for the current user
    user_profile = UserProfile.objects.get(user=request.user)

    # Check if latitude and longitude exist in the user profile
    latitude = user_profile.latitude
    longitude = user_profile.longitude

    # If latitude and longitude are not available, set them to None
    if latitude is None or longitude is None:
        # Call a function to fetch latitude and longitude (e.g., getLocation())
        # For simplicity, I'm using None here; replace with actual function calls
        latitude = None
        longitude = None
    else:
        # If latitude and longitude are available, update the map with the current coordinates
        update_map(latitude, longitude)

    return render(request, 'userprofile/userprofile.html', {'user_profile': user_profile, 'latitude': latitude, 'longitude': longitude})

def index(request):
    return render(request, 'userprofile/index.html')

def update_map(latitude, longitude):
    # Function to update Google Maps iframe src with latitude and longitude
    # Construct the Google Maps URL with latitude and longitude, including the API key
    google_map_src = f"https://www.google.com/maps/embed/v1/place?key=AIzaSyDUkEeZw1XQwyc8MUk63xeghTnfe1PiioU&q={latitude},{longitude}"

    # Set the src attribute of the Google Maps iframe
    # Assuming you have an element with id 'googleMap' in your HTML
    return google_map_src

from django.http import JsonResponse
from django.views.decorators.http import require_POST
from .models import UserProfile
import json

@require_POST
def update_location(request):
    if request.user.is_authenticated:
        try:
            data = json.loads(request.body)
            latitude = data.get('latitude')
            longitude = data.get('longitude')

            # Update latitude and longitude in the user profile model
            user_profile = request.user.userprofile
            user_profile.latitude = latitude
            user_profile.longitude = longitude
            user_profile.save()

            return JsonResponse({'message': 'Location updated successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'User not authenticated'}, status=401)