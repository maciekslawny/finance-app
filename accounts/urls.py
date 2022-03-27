from xml.etree.ElementInclude import include

from django.urls import include, path
from rest_framework import routers

from .views import (BlacklistTokenUpdateView, CustomUserCreate,
                    UserProfileView, YourProfileView)

app_name = "accounts"

router = routers.DefaultRouter()
router.register(r"profile", UserProfileView, basename="profile")
router.register(r"your-profile", YourProfileView, basename="yourprofile")

urlpatterns = [
    path("", include(router.urls)),
    path("create/", CustomUserCreate.as_view(), name="create_user"),
    path("logout/blacklist/", BlacklistTokenUpdateView.as_view(), name="blacklist"),
]
