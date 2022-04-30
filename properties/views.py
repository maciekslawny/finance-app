from django.shortcuts import render
from rest_framework import viewsets
from .models import PropertyOffer, PropertyImage
from .serializers import PropertyOfferSerializer, PropertyImageSerializer


# Create your views here.

class PropertyOfferAllViewSet(viewsets.ModelViewSet):
    serializer_class = PropertyOfferSerializer
    queryset = PropertyOffer.objects.all()
    

class PropertyOfferOldViewSet(viewsets.ModelViewSet):
    serializer_class = PropertyOfferSerializer
    queryset = PropertyOffer.objects.filter(new=False)

class PropertyOfferNewViewSet(viewsets.ModelViewSet):
    serializer_class = PropertyOfferSerializer
    queryset = PropertyOffer.objects.filter(new=True)

class PropertyOfferMapViewSet(viewsets.ModelViewSet):
    serializer_class = PropertyOfferSerializer
    queryset = PropertyOffer.objects.all().exclude(longitude__isnull=True).exclude(latitude__isnull=True)

class PropertyImageViewSet(viewsets.ModelViewSet):
    serializer_class = PropertyImageSerializer
    queryset = PropertyImage.objects.all()

    def get_object(self):
        pk = self.kwargs['pk']
        queryset = PropertyOffer.objects.all()
        for item in queryset:
            images = item.images
            for image in images.all():
                print(image.url)
        return PropertyImage.objects.filter(property_offer=pk).first()