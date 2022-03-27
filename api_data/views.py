from django.shortcuts import render
from rest_framework import viewsets

from .models import Cryptocurrency, Currency, Metal
from .serializers import (CryptocurrencySerializer, CurrencySerializer,
                          MetalSerializer)

# Create your views here.


class CurrencyView(viewsets.ModelViewSet):
    serializer_class = CurrencySerializer
    queryset = Currency.objects.all()


class MetalView(viewsets.ModelViewSet):
    serializer_class = MetalSerializer
    queryset = Metal.objects.all()


class CryptocurrencyView(viewsets.ModelViewSet):
    serializer_class = CryptocurrencySerializer
    queryset = Cryptocurrency.objects.all()
