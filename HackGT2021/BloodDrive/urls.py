from django.urls import path
from .views import *

urlpatterns = [
    path("GetUser", GetCurrentUser.as_view(), name="getuser"),
    path("CreateUser", CreateUser.as_view(), name="createuser"),
    path("patch-user/<pk>/", UpdateUserAfterDonation.as_view(), name="updateuser"),
    path("create-center/", CreateBloodCenter.as_view(), name="updateuser"),
    path("create-appointment/<pk>/", CreateAppointment.as_view(), name="updateuser"),
    path("get-leaderboard/", GetLeaderboard.as_view(), name="getleaderboard"),
    path("get-coupons/", GetCoupons.as_view(), name="getcoupons"),
    path("create-coupon/", CreateCoupon.as_view(), name="createcoupon"),
    path("ncr", NcrApi, name="ncrapi")
    
]
