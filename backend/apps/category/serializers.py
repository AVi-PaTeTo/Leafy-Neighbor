from rest_framework import serializers
from .models import Category, Tag, TagGroup

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields = "__all__"



class TagSerializer(serializers.ModelSerializer):
    # group = serializers.ReadOnlyField(source="tag_group.name")
    class Meta:
        model=Tag
        fields = ['id', 'tag_group', 'name', 'slug']
        read_only_fields = ['slug']

class TagGroupSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    
    class Meta:
        model=TagGroup
        fields = ['id', 'name', 'tags']