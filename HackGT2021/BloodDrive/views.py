from datetime import date, datetime
import random
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework import authentication, permissions, status
from BloodDrive.models import User, BloodCenter, Coupon
from BloodDrive.serializers import UserSerializer, BloodCenterSerializer, AppointmentSerializer, CouponSerializer

import requests

class GetCurrentUser(APIView):
    """
    Gets current user.
    """
    def get(self, request, format=None):
        """
        Return current user.
        """
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def post(self, request, format=None):
        return Response(status=status.HTTP_400_BAD_REQUEST)

class CreateUser(APIView):
    """
    Creates a new user.
    Input:
    {
        "username": "hello",
        "email": "helloworld@gmail.com",
        "password": "helloworld"
    }
    """
    def get(self, request, format=None):
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    def post(self, request, format=None):
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class UpdateUserAfterDonation(APIView):
    """
    Updates user fields. Currently supports times_donated, experience, and badges
    Input:
    {
        "times_donated": 1,
        "experience": 35,
        "time_since_last": "2021-03-29"
    }
    """
    def patch(self, request, pk):
        data = JSONParser().parse(request)
        try:
            model = User.objects.get(username=pk)
        except User.DoesNotExist:
            Response(status=status.HTTP_400_BAD_REQUEST)

        if "times_donated" in data:
            data["times_donated"] = model.times_donated + 1
        if "experience" in data:
            data["experience"] = model.experience + data["experience"]
        if "time_since_last" in data:
            data["time_since_last"] = date.fromisoformat(data["time_since_last"])
        if "badges" in data:
            data["badges"] = model.badges + "," + data["badges"]
        
        serializer = UserSerializer(model, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)

class CreateBloodCenter(APIView):
    """
    Creates Blood Center.
    Input:
    {
        "name": "Red Cross",
        "email": "redcross@gmail.com",
        "address": "address123"
    }
    """
    def get(self, request, format=None):
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    def post(self, request, format=None):
        data = JSONParser().parse(request)
        serializer = BloodCenterSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class CreateAppointment(APIView):
    """
    Creates appointment.
    Input:
    {
        "booked": true,
        "start_time": "2021-10-20T13:00:00",
        "end_time": "2021-10-20T13:30:00",
        "donation_type": "BLD"
    }
    """
    def get(self, request, pk):
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    def post(self, request, pk):
        data = JSONParser().parse(request)
        
        try:
            center = BloodCenter.objects.get(name=pk)
            print(center.name + " " + center.address)
        except BloodCenter.DoesNotExist:
            Response(status=status.HTTP_400_BAD_REQUEST)

        data["user"] = request.user.pk
        data["center"] = center.pk
        data["start_time"] = datetime.fromisoformat(data["start_time"])
        data["end_time"] = datetime.fromisoformat(data["end_time"])
        data["reward"] = random.randrange(30, 50, 1)
        serializer = AppointmentSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class GetLeaderboard(APIView):
    """
    Gets top 100 users.
    """
    def get(self, request, format=None):
        serializer = UserSerializer(User.objects.order_by("-experience")[:100], many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        return Response(status=status.HTTP_400_BAD_REQUEST)

class CreateCoupon(APIView):
    """
    Creates Coupon.
    Input:
    {
        "coupon_val": "BK"
    }
    """
    def get(self, request, format=None):
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    def post(self, request, format=None):
        data = JSONParser().parse(request)
        serializer = CouponSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class GetCoupons(APIView):
    """
    Gets coupons.
    """
    def get(self, request, format=None):
        serializer = CouponSerializer(Coupon.objects.all(), many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        return Response(status=status.HTTP_400_BAD_REQUEST)


class NcrApi(APIView):
    headers = {
        'content-type': 'application/json',
        'nep-organization': 'test-drive-d158b678ebb44d7091df3'
    }
    id = 'd6d512064bca42dca7ef29f1b3e506a5'
    url = 'https://gateway-staging.ncrcloud.com/site/sites/%s'%id
    r = requests.get(url, headers=headers, auth=('04aaf6cf-a10a-4524-ac23-f580b885c85b','password1234@'))
    
    def get(self, request, format=None):
        return Response(status=400)
    
    def post(self, request, format=None):
        return Response(status=400)