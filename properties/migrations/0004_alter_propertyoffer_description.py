# Generated by Django 4.0.1 on 2022-04-29 21:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('properties', '0003_alter_city_latitude_alter_city_longitude_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='propertyoffer',
            name='description',
            field=models.TextField(),
        ),
    ]
