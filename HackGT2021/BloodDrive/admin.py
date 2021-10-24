from django.contrib import admin
from .models import User, Coupon, BloodCenter, Appointment

# Register your models here.
admin.site.register(User)
admin.site.register(Coupon)
admin.site.register(BloodCenter)
admin.site.register(Appointment)