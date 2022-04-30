from django.urls import include, path
from rest_framework import routers

from .views import PropertyOfferAllViewSet, PropertyOfferMapViewSet, PropertyOfferNewViewSet, PropertyOfferOldViewSet, PropertyImageViewSet

app_name = "properties"

router = routers.DefaultRouter()
router.register(r"all", PropertyOfferAllViewSet, basename="properties-all")
router.register(r"map", PropertyOfferMapViewSet, basename="properties-map")
router.register(r"new", PropertyOfferNewViewSet, basename="properties-new")
router.register(r"old", PropertyOfferOldViewSet, basename="properties-old")
router.register(r"images", PropertyImageViewSet, basename="properties-images")
urlpatterns = [
    path("", include(router.urls)),
]
