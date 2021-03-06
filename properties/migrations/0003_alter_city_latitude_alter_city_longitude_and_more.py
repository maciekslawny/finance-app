# Generated by Django 4.0.1 on 2022-04-29 21:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('properties', '0002_propertyoffer_website'),
    ]

    operations = [
        migrations.AlterField(
            model_name='city',
            name='latitude',
            field=models.FloatField(blank=True, default='', null=True),
        ),
        migrations.AlterField(
            model_name='city',
            name='longitude',
            field=models.FloatField(blank=True, default='', null=True),
        ),
        migrations.AlterField(
            model_name='propertyoffer',
            name='latitude',
            field=models.FloatField(blank=True, default='', null=True),
        ),
        migrations.AlterField(
            model_name='propertyoffer',
            name='longitude',
            field=models.FloatField(blank=True, default='', null=True),
        ),
    ]
