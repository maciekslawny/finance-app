from api_data.models import Currency
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager,
                                        PermissionsMixin)
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


class CustomAccountManager(BaseUserManager):
    def create_superuser(self, email, user_name, first_name, password, **other_fields):

        other_fields.setdefault("is_staff", True)
        other_fields.setdefault("is_superuser", True)
        other_fields.setdefault("is_active", True)

        if other_fields.get("is_staff") is not True:
            raise ValueError("Superuser must be assigned to is_staff=True.")
        if other_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must be assigned to is_superuser=True.")

        return self.create_user(email, user_name, first_name, password, **other_fields)

    def create_user(self, email, user_name, first_name, password, **other_fields):

        if not email:
            raise ValueError(_("You must provide an email address"))

        email = self.normalize_email(email)
        user = self.model(
            email=email, user_name=user_name, first_name=first_name, **other_fields
        )
        user.set_password(password)
        user.save()
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(_("email address"), unique=True)
    user_name = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    start_date = models.DateTimeField(default=timezone.now)
    about = models.TextField(_("about"), max_length=500, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomAccountManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["user_name", "first_name"]

    def __str__(self):
        return self.user_name


class UserProfile(models.Model):
    currency_id = Currency.objects.get(symbol="PLN").id
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    nationality = models.CharField(max_length=200)
    updated_times = models.IntegerField(default=0)
    selected_currency = models.ForeignKey(
        Currency, on_delete=models.CASCADE, default=currency_id
    )
    goal_amount = models.PositiveIntegerField(default=0)
    goal_currency = models.ForeignKey(
        Currency,
        on_delete=models.CASCADE,
        related_name="goal_currency",
        default=currency_id,
    )

    def __str__(self):
        return str(self.user)

    # def update_user_profile(sender, instance, created, **kwargs):
    #     if created == False:
    #         instance.
