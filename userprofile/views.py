from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import UserProfile

@login_required
def profile_view(request):
    # Get the UserProfile object for the current user
    user_profile = UserProfile.objects.get(user=request.user)
    return render(request, 'userprofile/userprofile.html', {'user_profile': user_profile})

def index(request):
    return render(request, 'userprofile/index.html')


# views.py
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
