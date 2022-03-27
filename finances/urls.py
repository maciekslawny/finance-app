from django.urls import include, path
from rest_framework import routers

from .views import (AssetInfoView, AssetViewSet, CategoryViewSet,
                    OperationViewSet, StatisticInfoView)

app_name = "finances"

router = routers.DefaultRouter()
router.register(r"operations", OperationViewSet, basename="operations")
router.register(r"asset", AssetViewSet, basename="assets")
router.register(r"category", CategoryViewSet, basename="category")

urlpatterns = [
    path("", include(router.urls)),
    # path('<int:pk>/', OperationDetail.as_view(), name='detailcreate'),
    path("asset-info", AssetInfoView.as_view(), name="asset-info"),
    path("statistic-info", StatisticInfoView.as_view(), name="statistic-info"),
]
