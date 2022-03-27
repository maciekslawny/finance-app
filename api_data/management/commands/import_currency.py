from json import loads

from api_data.models import Currency
from django.core.management.base import BaseCommand, CommandError
from django.utils import timezone
from requests import get


class Command(BaseCommand):
    help = "Retrieves Currency exchange rates from API"

    def currency_symbol_list_database(self):
        queryset = Currency.objects.filter()
        return [currency.symbol for currency in queryset]

    def update_currency_price(self, currency_symbol, new_price):
        currency = Currency.objects.get(symbol=currency_symbol)
        currency.price = new_price
        currency.date_update = timezone.now()
        currency.save()
        print(f"Price for currency {currency_symbol} has been updated.")

    def handle(self, *args, **options):
        currency_symbols = self.currency_symbol_list_database()
        for currency_symbol in currency_symbols:
            api_url = (
                f"https://api.exchangerate.host/convert?from={currency_symbol}&to=USD"
            )
            currency_price = loads(get(api_url).text)["info"]["rate"]
            self.update_currency_price(currency_symbol, currency_price)
