from django.shortcuts import render
from django.contrib.auth.decorators import login_required


@login_required
def userprofile(request):
    return render(request, 'userprofile/userprofile.html')

def index(request):
    return render(request, 'userprofile/index.html')