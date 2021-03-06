from django.urls import include, path
from rest_framework import routers

from .views import PropertyOfferAllViewSet, PropertyOfferMapViewSet, PropertyOfferNewViewSet, PropertyOfferOldViewSet, \
    PropertyImageViewSet, SearchesViewSet, CitiesViewSet

app_name = "properties"

router = routers.DefaultRouter()
router.register(r"all", PropertyOfferAllViewSet, basename="properties-all")
router.register(r"map", PropertyOfferMapViewSet, basename="properties-map")
router.register(r"new", PropertyOfferNewViewSet, basename="properties-new")
router.register(r"old", PropertyOfferOldViewSet, basename="properties-old")
router.register(r"images", PropertyImageViewSet, basename="properties-images")
router.register(r"searches", SearchesViewSet, basename="dearches")
router.register(r"cities", CitiesViewSet, basename="cities")
urlpatterns = [
    path("", include(router.urls)),
]
