from django.db import models

# Create your models here.


class Cryptocurrency(models.Model):
    symbol = models.CharField(max_length=200, unique=True)
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    date_update = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.name


class Currency(models.Model):
    symbol = models.CharField(max_length=200, unique=True)
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=4)
    date_update = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.name


class Metal(models.Model):
    symbol = models.CharField(max_length=200, unique=True)
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=4)
    date_update = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.name
