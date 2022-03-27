from importlib.resources import path

from api_data.views import CryptocurrencyView, CurrencyView, MetalView
from django.urls import include, path
from rest_framework import routers

app_name = "api_data"

router = routers.DefaultRouter()
router.register(r"currency", CurrencyView, basename="currency")
router.register(r"cryptocurrency", CryptocurrencyView, basename="cryptocurrency")
router.register(r"metal", MetalView, basename="metal")


urlpatterns = [
    path("", include(router.urls)),
]
