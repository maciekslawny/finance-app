# Generated by Django 4.0.1 on 2022-03-03 18:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("contenttypes", "0002_remove_content_type_name"),
        ("accounts", "0005_wallet"),
    ]

    operations = [
        migrations.AlterField(
            model_name="wallet",
            name="content_type",
            field=models.ForeignKey(
                limit_choices_to=models.Q(
                    models.Q(("app_label", "api_data"), ("model", "cryptocurrency")),
                    models.Q(("app_label", "api_data"), ("model", "currency")),
                    _connector="OR",
                ),
                on_delete=django.db.models.deletion.CASCADE,
                to="contenttypes.contenttype",
            ),
        ),
    ]
