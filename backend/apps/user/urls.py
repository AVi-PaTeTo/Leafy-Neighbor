from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import UserApiView

router = DefaultRouter()
router.register(r'users', UserApiView, basename="user")

urlpatterns = [
    path('', include(router.urls)),
    ]