from django.contrib import admin

from .models import Asset, Category, Operation

# Register your models here.


admin.site.register(Operation)
admin.site.register(Category)


class AssetAdmin(admin.ModelAdmin):
    fields = [
        "tag",
        "user",
        "amount",
        "content_type",
        "date_added",
        "object_id",
        "content_object",
    ]
    readonly_fields = ["content_object"]

    class Meta:
        model = Asset


admin.site.register(Asset, AssetAdmin)
