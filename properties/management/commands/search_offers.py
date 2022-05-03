from django.core.management.base import BaseCommand
from properties.models import Searches, PropertyOffer, City, PropertyImage
from datetime import date
import requests
from bs4 import BeautifulSoup


class Command(BaseCommand):
    help = "Retrieves Crypto prices from API"

    @staticmethod
    def check_already_exists(offer):
        queryset = PropertyOffer.objects.filter(name=offer['name'], price=offer['price'], meters=offer['meters'])
        return queryset.exists()

    @staticmethod
    def create_new_propertyoffer(offer):

        city_exists = City.objects.filter(name=str(offer['city'])).exists()
        if not city_exists:
            new_city = City(
                name=str(offer['city'])
            )
            new_city.save()

        new_property_offer = PropertyOffer(
            website=offer['website'],
            name=offer['name'],
            offer_link=offer['offer_link'],
            description=offer['description'],
            price=offer['price'],
            meters=offer['meters'],
            added_date=date.today(),
            city=City.objects.get(name=str(offer['city']))
        )
        new_property_offer.save()
        print('Property offer created.', new_property_offer.id)

        for image in offer['images']:
            property_image = PropertyImage(
                url=image,
                property_offer=new_property_offer
            )
            property_image.save()
            print('Image created.')

    @staticmethod
    def extract_info_single_olx_link(link):
        page = requests.get(link)
        bs = BeautifulSoup(page.content, "html.parser")
        page_string = str(bs)
        offer_dict = {}
        price = float(
            bs.find("div", {"data-testid": "ad-price-container"}).get_text().replace("do negocjacji", "").replace("zł",
                                                                                                                  "").replace(
                " ", ""))
        name = bs.find("h1", {"data-cy": "ad_title"}).get_text()
        description = bs.find(class_='css-g5mtbi-Text').get_text()
        table_items = bs.find("ul", {"class": "css-sfcl1s"}).find_all(class_='css-ox1ptj')

        city_value = page_string.find('cityName')
        city = page_string[city_value + 13:city_value + 30].split("\\")[0].lower()

        for item in table_items:
            if 'Powierzchnia' in item.get_text():
                meters = float(item.get_text().replace("Powierzchnia: ", "").replace("m²", "").replace(",", "."))
                offer_dict['meters'] = meters
            elif 'Poziom' in item.get_text():
                floor = item.get_text().replace("Poziom: ", "")
                offer_dict['floor'] = floor
            elif 'Liczba pokoi' in item.get_text():
                rooms = item.get_text().replace("Liczba pokoi: ", "")
                offer_dict['rooms'] = rooms

        images_urls = []
        images_html = bs.find(class_='swiper-wrapper').find_all(class_='swiper-lazy')
        for image in images_html:
            image_url = image['data-src']
            images_urls.append(image_url)

        offer_dict['description'] = description
        offer_dict['price'] = price
        offer_dict['images'] = images_urls
        offer_dict['name'] = name
        offer_dict['offer_link'] = link
        offer_dict['city'] = city
        offer_dict['website'] = 'olx'

        return offer_dict

    @staticmethod
    def extract_info_single_otodom_link(link):
        page = requests.get(link)
        bs = BeautifulSoup(page.content, "html.parser")
        page_string = str(bs)
        offer_dict = {}

        name = bs.find("h1", {"data-cy": "adPageAdTitle"}).get_text()
        price = float(bs.find("strong", {"data-cy": "adPageHeaderPrice"}).get_text().replace(" ", "").replace("zł", ""))
        meters = float(
            bs.find("div", {"aria-label": "Powierzchnia"}).get_text().replace("Powierzchnia", "").replace("m²",
                                                                                                          "").replace(
                " ", "").replace(",", "."))
        try:
            rooms = bs.find("div", {"aria-label": "Liczba pokoi"}).get_text().replace("Liczba pokoi", "").replace("m²",
                                                                                                                  "").replace(
                " ", "")
        except:
            pass
        description = bs.find("div", {"data-cy": "adPageAdDescription"}).get_text()

        city_value = page_string.find('"City":"')
        city = page_string[city_value + 8:city_value + 30].split('"')[0].lower()

        images_urls = []

        last_value = 0
        while page_string.find('"large":"', last_value + 9) != -1:
            last_value = page_string.find('"large":"', last_value + 9)
            image_link = page_string[last_value + 9:last_value + 400].split('","')[0]
            images_urls.append(image_link)

        offer_dict['description'] = description
        offer_dict['meters'] = meters
        offer_dict['price'] = price
        offer_dict['images'] = images_urls
        offer_dict['name'] = name
        offer_dict['offer_link'] = link
        offer_dict['city'] = city
        offer_dict['website'] = 'otodom'

        return offer_dict

    @staticmethod
    def search_olx_offers(search):
        URL = f"https://www.olx.pl/d/{search.category}/{search.city.name}/?search%5Border%5D=filter_float_price%3Aasc&search%5Bfilter_float_price%3Afrom%5D={search.min_price}&search%5Bfilter_float_price%3Ato%5D={search.max_price}"
        page = requests.get(URL)
        bs = BeautifulSoup(page.content, "html.parser")
        offers_list_html = bs.find("div", {"data-testid": "listing-grid"}).find_all("div", {"data-cy": "l-card"})

        offers_list_dict = {}
        olx_links = []
        otodom_links = []

        for offer in offers_list_html:
            url = offer.find(href=True)['href']
            if url.startswith('https://www.otodom.pl'):
                otodom_links.append(url)
            else:
                url = f'https://www.olx.pl{url}'
                olx_links.append(url)

        offers_list_dict['olx'] = olx_links
        offers_list_dict['otodom'] = otodom_links

        return offers_list_dict

    def handle(self, *args, **options):
        searches = Searches.objects.all()

        for search in searches:
            offers_links = self.search_olx_offers(search)

            for offer_link in offers_links['olx']:
                offer_dict = self.extract_info_single_olx_link(offer_link)
                already_exists = self.check_already_exists(offer_dict)
                if not already_exists:
                    self.create_new_propertyoffer(offer_dict)

            for offer_link in offers_links['otodom']:
                offer_dict = self.extract_info_single_otodom_link(offer_link)
                already_exists = self.check_already_exists(offer_dict)
                if not already_exists:
                    self.create_new_propertyoffer(offer_dict)
