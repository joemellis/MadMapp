from django.db import models
from cloudinary.models import CloudinaryField

from django.contrib.auth.models import User
from django.db import models
from cloudinary.models import CloudinaryField

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    profile_picture = CloudinaryField('profile_picture', default='placeholder')
    address = models.CharField(max_length=100, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    website = models.URLField(blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    friends = models.ManyToManyField(User, related_name='friends', blank=True)
    blocked_users = models.ManyToManyField(User, related_name='blocked_users', blank=True)
    messages = models.ManyToManyField('Message', related_name='user_messages', blank=True)
    coins = models.IntegerField(default=0)
    bronze_token = models.IntegerField(default=0)
    silver_token = models.IntegerField(default=0)
    gold_token = models.IntegerField(default=0)
    teir = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username
from django.db import models

class MyImages(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='my_images/')
    description = models.TextField()

    def __str__(self):
        return self.title

class MySharedImages(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='my_shared_images/')
    description = models.TextField()

    def __str__(self):
        return self.title