from django.shortcuts import render
from .models import Review
from .serializers import ReviewSerializer
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticatedOrReadOnly
# Create your views here.

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        product = serializer.validated_data['product']
        user = self.request.user
        if Review.objects.filter(product=product, user=user).exists():
            raise ValidationError("You have already reviewed this product.")
        serializer.save(user=user)