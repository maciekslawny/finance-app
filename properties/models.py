from django.db import models

class City(models.Model):
    name = models.CharField(max_length=50)
    longitude = models.FloatField(default='', null=True, blank=True)
    latitude = models.FloatField(default='', null=True, blank=True)

    def __str__(self):
        return self.name

class PropertyOffer(models.Model):
    WEBSITES = [
        ("olx", "olx"),
        ("otodom", "otodom"),
    ]

    website = models.CharField(max_length=50, choices=WEBSITES)
    name = models.CharField(max_length=300)
    offer_link = models.CharField(max_length=500)
    description = models.TextField()
    price = models.FloatField()
    meters = models.FloatField()
    longitude = models.FloatField(default='', null=True, blank=True)
    latitude = models.FloatField(default='', null=True, blank=True)
    city = models.ForeignKey(City, null=True, on_delete=models.SET_NULL)
    added_date = models.DateField()
    new = models.BooleanField(default=True)
    favorite = models.BooleanField(default=False)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class PropertyImage(models.Model):
    url = models.CharField(max_length=500)
    property_offer = models.ForeignKey(PropertyOffer, on_delete=models.CASCADE, related_name='images')

    def __str__(self):
        return self.property_offer.name