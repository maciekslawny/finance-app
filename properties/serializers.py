from rest_framework import serializers

from .models import PropertyOffer, PropertyImage, Searches


class PropertyOfferSerializer(serializers.ModelSerializer):
    images = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='url'
    )

    class Meta:
        model = PropertyOffer
        fields = '__all__'

class PropertyImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = PropertyImage
        fields = "__all__"

class SearchesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Searches
        fields = "__all__"
        