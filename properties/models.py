from django.db import models

class City(models.Model):
    name = models.CharField(max_length=50)
    longitude = models.FloatField(null=True, blank=True)
    latitude = models.FloatField(null=True, blank=True)

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
    longitude = models.FloatField(null=True, blank=True)
    latitude = models.FloatField(null=True, blank=True)
    city = models.ForeignKey(City, null=True, on_delete=models.SET_NULL)
    added_date = models.DateField()
    new = models.BooleanField(default=True)
    favorite = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class PropertyImage(models.Model):
    url = models.CharField(max_length=500)
    property_offer = models.ForeignKey(PropertyOffer, on_delete=models.CASCADE, related_name='images')

    def __str__(self):
        return self.property_offer.name

class Searches(models.Model):
    WEBSITES = [
        ("olx", "olx"),
        ("otodom", "otodom"),
    ]
    KILOMETERS = [
        ('0', '0'),
        ('2', '2'),
        ('5', '5'),
        ('10', '10'),
        ('15', '15'),
        ('30', '30'),
        ('50', '50'),
        ('75', '75'),
        ('100', '100'),
    ]
    CATEGORIES = [
        ("nieruchomosci/mieszkania/sprzedaz", "nieruchomosci/mieszkania/sprzedaz"),
    ]
    phrase = models.CharField(max_length=300, blank=True)
    website = models.CharField(max_length=50, choices=WEBSITES)
    max_price = models.IntegerField(null=True)
    min_price = models.IntegerField(default=0)
    distance = models.CharField(max_length=4, choices=KILOMETERS)
    category = models.CharField(max_length=100, choices=CATEGORIES)
    city = models.ForeignKey(City, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f'{self.phrase} {self.category}'

