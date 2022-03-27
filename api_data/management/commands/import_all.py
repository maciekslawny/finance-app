from json import loads

from api_data.models import Cryptocurrency
from django.core.management import call_command
from django.core.management.base import BaseCommand
from django.utils import timezone
from requests import get


class Command(BaseCommand):
    help = "Retrieves Crypto prices from API"

    def handle(self, *args, **options):
        call_command("import_cryptocurrency")
        call_command("import_currency")
        call_command("import_metals")
