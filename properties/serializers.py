from rest_framework import serializers

from .models import PropertyOffer, PropertyImage, Searches, City


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
    city_name = serializers.SerializerMethodField(source='get_city_name')

    class Meta:
        model = Searches
        fields = "__all__"

    @staticmethod
    def get_city_name(obj):
        return obj.city.name

class CitiesSerializer(serializers.ModelSerializer):

    class Meta:
        model = City
        fields = "__all__"
        