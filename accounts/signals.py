from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver

from .models import CustomUser, UserProfile


@receiver(post_save, sender=CustomUser)
def create_user_profile(sender, instance, created, **kwargs):

    if created:
        UserProfile.objects.create(user=instance)
        print("Profile created!")


@receiver(post_save, sender=CustomUser)
def update_user_profile(sender, instance, created, **kwargs):
    # User updates counter

    if created == False:
        # instance.userprofile.updated_times += 1
        # instance.userprofile.save()
        print("Profile updated!")
