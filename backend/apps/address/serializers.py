from rest_framework.serializers import ModelSerializer
from .models import Address


class AddressSerializer(ModelSerializer):
    class Meta:
        model = Address
        fields = [
                    "id", 
                    "user",
                    "name", 
                    "address_type",
                    "phone", 
                    "house",
                    "street", 
                    "city", 
                    "state", 
                    "pincode", 
                    "is_default"
                    ]
        
        read_only_fields = [
                            "id", 
                            "user", 
                            ]
