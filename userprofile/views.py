from django.shortcuts import render

# Create your views here.
def userprofile(request):
    return render(request, 'userprofile/userprofile.html')

def index(request):
    return render(request, 'userprofile/index.html')