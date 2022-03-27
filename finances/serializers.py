from rest_framework import serializers

from .models import Asset, Category, Operation


class OperationSerializer(serializers.ModelSerializer):
    get_sum = serializers.ReadOnlyField()

    class Meta:
        model = Operation
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class AssetSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField()
    type = serializers.ReadOnlyField()

    class Meta:
        model = Asset
        fields = "__all__"


class TestSerializer(serializers.Serializer):
    """Your data serializer, define your fields here."""

    name = serializers.CharField()
    likes = serializers.IntegerField()
