# Generated by Django 4.0.1 on 2022-02-21 23:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0002_alter_customuser_is_active_userprofile"),
    ]

    operations = [
        migrations.AddField(
            model_name="userprofile",
            name="updated_times",
            field=models.IntegerField(default=0),
        ),
    ]
