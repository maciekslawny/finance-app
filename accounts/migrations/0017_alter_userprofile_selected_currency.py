# Generated by Django 4.0.1 on 2022-03-19 17:20

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api_data", "0009_rename_metals_metal"),
        ("accounts", "0016_userprofile_selected_currency"),
    ]

    operations = [
        migrations.AlterField(
            model_name="userprofile",
            name="selected_currency",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                to="api_data.currency",
            ),
        ),
    ]
