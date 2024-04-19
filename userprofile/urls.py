from django.urls import path
from . import views

urlpatterns= [
    path('userprofile/', views.userprofile, name='userprofile'),
    path('', views.index, name='index'),
]