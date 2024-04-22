from django.urls import path
from . import views

urlpatterns= [
    path('', views.profile_view, name='userprofile'), 
    path('', views.index, name='index'),
    path('update_location/', views.update_location, name='update_location'),
]
