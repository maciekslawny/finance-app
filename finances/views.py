from accounts.models import UserProfile
from api_data.models import Currency
from django.db.models import Sum
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from .pagination import SmallResultsSetPagination

from .models import Asset, Category, Operation
from .serializers import (AssetSerializer, CategorySerializer,
                          OperationSerializer)


class OperationViewSet(viewsets.ModelViewSet):
    serializer_class = OperationSerializer
    pagination_class = SmallResultsSetPagination

    def get_queryset(self):
        queryset = Operation.objects.filter(user=self.request.user)
        return queryset

    def create(self, request):
        if hasattr(request.data, "_mutable"):
            request.data._mutable = True
        print(request.data["user"])
        request.data["user"] = request.user.id
        return super().create(request)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer

    def create(self, request):
        if hasattr(request.data, "_mutable"):
            request.data._mutable = True
        request.data["user"] = request.user.id
        return super().create(request)


from rest_framework import views
from rest_framework.response import Response

from .serializers import TestSerializer


class AssetInfoView(views.APIView):
    def create_assets_dictionary(self, assets_queryset):
        user_assets = {}

        for asset in assets_queryset:
            asset_category = (
                asset.content_type.model
            )  # cryptocurrency, metals, currency..
            asset_type = (
                asset.content_object.name
            )  # bitcoin, ethereum, gold, silver, USD, EUR
            assert_type_price = asset.content_object.price

            if asset_category in user_assets:
                if asset_type in user_assets[f"{asset_category}"]:
                    user_assets[f"{asset_category}"][f"{asset_type}"] = {
                        "amount": user_assets[f"{asset_category}"][f"{asset_type}"][
                            "amount"
                        ]
                        + asset.amount,
                        "value": user_assets[f"{asset_category}"][f"{asset_type}"][
                            "value"
                        ]
                        + asset.amount * assert_type_price,
                    }
                    print(assert_type_price)
                else:
                    user_assets[f"{asset_category}"][f"{asset_type}"] = {
                        "amount": asset.amount,
                        "value": asset.amount * assert_type_price,
                    }
            else:
                user_assets[f"{asset_category}"] = {
                    f"{asset_type}": {
                        "amount": asset.amount,
                        "value": asset.amount * assert_type_price,
                    }
                }
        return user_assets

    def get_total_value(self, dictionary):
        total_value = 0
        for asset_category in dictionary:
            for asset_type in dictionary[f"{asset_category}"]:

                total_value = (
                    total_value
                    + dictionary[f"{asset_category}"][f"{asset_type}"]["value"]
                )

        return total_value

    def get(self, request):
        user = request.user
        user_profile = UserProfile.objects.get(user=user)
        user_currency = user_profile.selected_currency.symbol

        assets = Asset.objects.filter(user=user)

        assets_dictionary = self.create_assets_dictionary(assets)

        assets_value = self.get_total_value(assets_dictionary)

        total_revenue = Operation.objects.filter(
            operation_type="revenue", user=user
        ).aggregate(Sum("amount"))["amount__sum"]
        if total_revenue == None:
            total_revenue = 0
        total_expenses = Operation.objects.filter(
            operation_type="expense", user=user
        ).aggregate(Sum("amount"))["amount__sum"]
        if total_expenses == None:
            total_expenses = 0

        total_wallet = (
            (total_revenue - total_expenses)
            * Currency.objects.get(symbol="PLN").price
            / Currency.objects.get(symbol=user_currency).price
        )

        balance = (
            int(assets_value) / Currency.objects.get(symbol=user_currency).price
            + total_wallet
        )
        balance_currency = Currency.objects.get(symbol=user_currency).symbol

        # GOAL PROGRESS

        balance_in_goal_currency = round(
            balance
            * Currency.objects.get(symbol=user_currency).price
            / user_profile.goal_currency.price,
            2,
        )

        goal_amount = user_profile.goal_amount
        goal_currency = user_profile.goal_currency.symbol

        if goal_amount == 0:
            goal_progress = "0 %"
        else:
            goal_progress = (
                str(round(balance_in_goal_currency / goal_amount * 100, 2)) + "%"
            )

        result = {
            "assets": assets_dictionary,
            "assets_value": assets_value,
            "balance": int(balance),
            "balance_currency": balance_currency,
            "goal_amount": goal_amount,
            "balance_in_goal_currency": balance_in_goal_currency,
            "goal_currency": goal_currency,
            "goal_progress": goal_progress,
        }

        return Response(result)


class StatisticInfoView(views.APIView):
    def get(self, request):
        user = request.user

        months_list = []
        queryset = Operation.objects.filter(user=user, statistic_count=True)
        for item in queryset:
            month = str(item.operation_date)[0:7]
            if month not in months_list:
                months_list.append(month)
        months_list = sorted(months_list)

        sum_list = []
        revenue_list = []
        expense_list = []
        for month in months_list:
            total_revenues = Operation.objects.filter(
                statistic_count=True,
                user=user,
                operation_type="revenue",
                operation_date__year=f"{month[0:4]}",
                operation_date__month=f"{month[5:7]}",
            ).aggregate(Sum("amount"))["amount__sum"]
            if total_revenues == None:
                total_revenues = 0
            total_expenses = Operation.objects.filter(
                statistic_count=True,
                user=user,
                operation_type="expense",
                operation_date__year=f"{month[0:4]}",
                operation_date__month=f"{month[5:7]}",
            ).aggregate(Sum("amount"))["amount__sum"]
            if total_expenses == None:
                total_expenses = 0
            total_sum = total_revenues - total_expenses

            sum_list.append(total_sum)
            revenue_list.append(total_revenues)
            expense_list.append(total_expenses)

        print(months_list)
        print(sum_list)
        print(revenue_list)

        result = {
            "months_list": months_list,
            "sum_list": sum_list,
            "revenue_list": revenue_list,
            "expense_list": expense_list,
        }

        return Response(result)


# class OperationList(generics.ListCreateAPIView):
#     serializer_class = OperationSerializer

#     def get_queryset(self):
#         queryset = Operation.objects.filter(user=self.request.user)
#         print(Operation.objects.get(id=3).get_sum)
#         return queryset

# class OperationDetail(generics.RetrieveDestroyAPIView):
#     pass


# First thing first, APIView or ViewSet aren't tied to models while ModelViewSet, GenericAPIView, ListAPIView (and co) are.
# The major difference between *View and *ViewSet is that *ViewSet are meant to work with routers and provide a single class to expose a Resource while *View will require two (one for list/create, another for detail/update/delete).
# Note that APIView is the most lower level and will only tie to HTTP verbs (get/post/put...) while ViewSet or GenericAPIView will have CRUD such as list / update..
# In order to expose a Django's Model, you'll need either

# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
# or
#
# class UserListCreateView(ListCreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

# class UserRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
