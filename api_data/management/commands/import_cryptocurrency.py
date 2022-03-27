from json import loads

from api_data.models import Cryptocurrency
from django.core.management.base import BaseCommand, CommandError
from django.utils import timezone
from requests import get


class Command(BaseCommand):
    help = "Retrieves Crypto prices from API"

    def coins_name_list_database(self):
        queryset = Cryptocurrency.objects.filter()
        return [coin.name for coin in queryset]

    def update_coin_price(self, coin_name, new_price):
        coin = Cryptocurrency.objects.get(name=coin_name)
        coin.price = new_price
        coin.date_update = timezone.now()
        coin.save()
        print(f"Price for coin {coin_name} has been updated.")

    def handle(self, *args, **options):
        coin_names = self.coins_name_list_database()
        for coin_name in coin_names:
            api_url = f"https://api.coingecko.com/api/v3/coins/{coin_name}"
            coin_price = loads(get(api_url).text)["market_data"]["current_price"]["usd"]
            self.update_coin_price(coin_name, coin_price)
