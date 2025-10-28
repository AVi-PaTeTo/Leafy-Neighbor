from .models import Review
from rest_framework import serializers

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = Review
        fields = ['id', 'user', 'product', 'review', 'rating', 'date_created']
        read_only_fields = ['id', 'user', 'date_created']