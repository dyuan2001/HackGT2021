from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class Coupon(models.Model):
    COUPONS_OPS = (
        ("MCD", "Mcdonalds 10 off"),
        ("BK", "Burger king free whopper")
    )
    coupon_val = models.CharField(max_length=100, choices=COUPONS_OPS)

class User(AbstractUser): 
    username = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=40)
    email = models.EmailField(max_length=254)
    times_donated = models.IntegerField(default=0)
    time_since_last = models.DateField(null=True)
    experience = models.IntegerField(default=0)
    badges = models.CharField(blank=True, max_length=100)

    REQUIRED_FIELDS = ['password', 'email',]

class BloodCenter(models.Model):
    name = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=254)
    address = models.CharField(max_length=250)

class Appointment(models.Model):
    DONATION_TYPE = (
        ("BLD", "Blood"),
        ("PLS", "Plasma")
    )
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    center = models.ForeignKey(BloodCenter, on_delete=models.CASCADE)
    booked = models.BooleanField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    donation_type = models.CharField(max_length=10, choices=DONATION_TYPE)
    reward = models.IntegerField()

class Website_info(models.Model):
    pass