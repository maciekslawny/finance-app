from django.contrib import admin

from .models import Cryptocurrency, Currency, Metal

# Register your models here.

admin.site.register(Cryptocurrency)
admin.site.register(Currency)
admin.site.register(Metal)
