# Generated by Django 4.0.1 on 2022-03-03 18:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("contenttypes", "0002_remove_content_type_name"),
        ("accounts", "0006_alter_wallet_content_type"),
    ]

    operations = [
        migrations.RenameModel(
            old_name="Wallet",
            new_name="Asset",
        ),
    ]