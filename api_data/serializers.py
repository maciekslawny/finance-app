from rest_framework import serializers

from .models import Cryptocurrency, Currency, Metal


class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = "__all__"


class MetalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Metal
        fields = "__all__"


class CryptocurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Cryptocurrency
        fields = "__all__"
