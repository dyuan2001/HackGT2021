from django.urls import path
from .views import *

urlpatterns = [
    path("get-user/", GetCurrentUser.as_view(), name="getuser"),
    path("get-user/<pk>/", GetUserByPk.as_view(), name="getuserpk"),
    path("create-user/", CreateUser.as_view(), name="createuser"),
    path("patch-user/<pk>/", UpdateUserAfterDonation.as_view(), name="updateuser"),
    path("create-center/", CreateBloodCenter.as_view(), name="createcenter"),
    path("create-appointment/<pk>/", CreateAppointment.as_view(), name="createappointment"),
    path("delete-appointment/<pk>/", DeleteAppointment.as_view(), name="deleteappointmenet"),
    path("get-appointments/<pk>/", GetAppointmentsByCenter.as_view(), name="getappointmentsbycenter"),
    path("get-appointments/", GetAppointmentsByUser.as_view(), name="getappointmentsbyuser"),
    path("get-leaderboard/", GetLeaderboard.as_view(), name="getleaderboard"),
    path("get-coupons/", GetCoupons.as_view(), name="getcoupons"),
    path("create-coupon/", CreateCoupon.as_view(), name="createcoupon"),
    path("ncr/", NcrApi.as_view(), name="ncrapi")
]
