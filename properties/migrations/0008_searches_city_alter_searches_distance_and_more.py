# Generated by Django 4.0.1 on 2022-04-30 21:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('properties', '0007_searches_alter_propertyimage_property_offer'),
    ]

    operations = [
        migrations.AddField(
            model_name='searches',
            name='city',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='properties.city'),
        ),
        migrations.AlterField(
            model_name='searches',
            name='distance',
            field=models.CharField(choices=[('0', '0'), ('2', '2'), ('5', '5'), ('10', '10'), ('15', '15'), ('30', '30'), ('50', '50'), ('75', '75'), ('100', '100')], max_length=4),
        ),
        migrations.AlterField(
            model_name='searches',
            name='min_price',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='searches',
            name='phrase',
            field=models.CharField(blank=True, max_length=300),
        ),
    ]