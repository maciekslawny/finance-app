from json import loads

import requests
from api_data.models import Metal
from django.core.management.base import BaseCommand, CommandError
from django.utils import timezone


class Command(BaseCommand):
    help = "Retrieves Currency exchange rates from API"

    def metal_symbol_list_database(self):
        queryset = Metal.objects.filter()
        return [metal.symbol for metal in queryset]

    def update_metal_price(self, metal_symbol, new_price):
        metal = Metal.objects.get(symbol=metal_symbol)
        metal.price = new_price
        metal.date_update = timezone.now()
        metal.save()
        print(f"Price for metal {metal.name} has been updated.")

    def handle(self, *args, **options):
        api_url = "https://live-metal-prices.p.rapidapi.com/v1/latest/XAU,XAG,PA,PL,GBP,EUR/USD"
        headers = {
            "x-rapidapi-host": "live-metal-prices.p.rapidapi.com",
            "x-rapidapi-key": "ace080a46dmsh02665cc9174f2a4p1abc89jsn3f6da33e297e",
        }
        metal_prices = requests.request("GET", api_url, headers=headers).json()["rates"]

        metal_symbols = self.metal_symbol_list_database()

        for metal_symbol in metal_symbols:
            metal_price = metal_prices[f"{metal_symbol}"]
            self.update_metal_price(metal_symbol, metal_price)
            print(metal_prices[f"{metal_symbol}"])
