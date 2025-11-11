from django.shortcuts import render
from django.contrib.auth import get_user_model

from .serializers import UserSerializer, VendorProfileSerializer,CreateUserSerializer, ChangePasswordSerializer, MakeVendorSerializer
from .models import VendorProfile, CustomUser
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer 
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.is_superuser:
            return User.objects.all()
        return User.objects.filter(id=user.id)

    @extend_schema(request=MakeVendorSerializer)
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def make_vendor(self, request, pk=None):
        user = self.get_object()
        # Only allow user to update their own vendor status or admins
        if request.user != user and not request.user.is_staff:
            return Response({"error": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)
        
        user.is_vendor = True
        user.save()

        vendor_profile, created = VendorProfile.objects.get_or_create(user=user)

        # Serialize the profile as desired
        serializer = VendorProfileSerializer(vendor_profile)
        return Response({
                        "message": "User marked as vendor.",
                        "vendor_profile": serializer.data
                    }, status=status.HTTP_200_OK)
    
    @extend_schema(request=CreateUserSerializer)
    @action(detail=False, methods=['post'], permission_classes=[permissions.AllowAny])
    def create_user(self, request):
        email = request.data.get('email')
        username = request.data.get('username')
        password = request.data.get('password')
        user = CustomUser.objects.create_user(email=email, password=password, username=username)
        return Response({"message": "User created", "user_id": user.id})


    @extend_schema(request=ChangePasswordSerializer)
    @action(detail=True, methods=['post'])
    def change_password(self, request, pk=None):
        user = self.get_object()
        current_password = request.data.get('current_password')
        new_password = request.data.get('new_password')
        
        if not new_password:
            return Response({"error": "New password is required"}, status=400)

        if not user.check_password(current_password):
            return Response({"error": "Current password is incorrect"}, status=400)

        user.set_password(new_password)
        user.save()
        return Response({"message": "Password updated successfully"})

class VendorProfileViewSet(viewsets.ModelViewSet):
    queryset = VendorProfile.objects.all()
    serializer_class = VendorProfileSerializer