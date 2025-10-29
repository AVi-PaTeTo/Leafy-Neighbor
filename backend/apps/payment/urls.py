from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PaymentViewSet, create_razorpay_order, verify_payment

router = DefaultRouter()
router.register("transactions", PaymentViewSet, basename="transactions")

urlpatterns = [
    path("", include(router.urls)),  # for /api/payments/transactions/
    path("initiate/", create_razorpay_order, name="initiate-payment"),
    path("verify/", verify_payment, name="verify-payment"),
]