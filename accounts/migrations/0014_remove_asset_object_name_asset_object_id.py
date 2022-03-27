# Generated by Django 4.0.1 on 2022-03-03 19:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0013_alter_asset_object_name"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="asset",
            name="object_name",
        ),
        migrations.AddField(
            model_name="asset",
            name="object_id",
            field=models.PositiveIntegerField(default="1"),
            preserve_default=False,
        ),
    ]