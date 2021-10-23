from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from .models import Appointment, BloodCenter, User, Website_info, Coupon, Badge

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'times_donated', 'time_since_last', 'experience']

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class CustomRegisterSerializer(RegisterSerializer):
    def save(self, request):
        user = super().save(request)
        user.gender = self.data.get('gender')
        user.phone_number = self.data.get('phone_number')
        user.save()
        return user

class BloodCenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = BloodCenter
        fields = ['name', 'email', 'address']

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['user', 'center', 'booked', 'start_time', 'end_time', 'donation_type', 'reward']

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ['coupon_val']

class WebsiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Website_info
        fields = []