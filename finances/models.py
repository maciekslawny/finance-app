from curses import erasechar

from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.db.models import Sum

# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Operation(models.Model):
    TYPE_CHOICE = [
        ("revenue", "Revenue"),
        ("expense", "Expense"),
    ]

    CURRENCY_CHOICE = [
        ("PLN", "PLN"),
        ("USD", "USD"),
        ("EUR", "EUR"),
    ]

    name = models.CharField(max_length=200)
    operation_type = models.CharField(max_length=50, choices=TYPE_CHOICE)
    amount = models.IntegerField()
    operation_date = models.DateField(blank=True)
    operation_currency = models.CharField(
        max_length=6, choices=CURRENCY_CHOICE, default="PLN"
    )
    date_added = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category, null=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    statistic_count = models.BooleanField(default=True)

    # class Meta:
    #     ordering = ('operation_date')

    @property
    def get_sum(self):
        total_revenue = Operation.objects.filter(
            operation_type="revenue", user=self.user
        ).aggregate(Sum("amount"))["amount__sum"]
        total_expenses = Operation.objects.filter(
            operation_type="expense", user=self.user
        ).aggregate(Sum("amount"))["amount__sum"]
        try:
            result = total_revenue - total_expenses
        except:
            result = 0
        return result

    class Meta:
        ordering = ["-operation_date"]

    def __str__(self):
        return self.name


class Asset(models.Model):
    tag = models.SlugField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    limit = (
        models.Q(app_label="api_data", model="cryptocurrency")
        | models.Q(app_label="api_data", model="currency")
        | models.Q(app_label="api_data", model="metal")
    )
    content_type = models.ForeignKey(
        ContentType, limit_choices_to=limit, on_delete=models.CASCADE
    )
    object_id = models.PositiveIntegerField()
    amount = models.DecimalField(max_digits=20, decimal_places=10)
    date_added = models.DateTimeField(null=True, blank=True)
    content_object = GenericForeignKey("content_type", "object_id")

    @property
    def category_name(self):
        return str(self.content_type.model)

    @property
    def type(self):
        return str(self.content_object)

    def __str__(self):
        return self.tag
