# Generated by Django 5.1.4 on 2024-12-25 23:58

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_object_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='object',
            name='date_time_posted',
            field=models.DateTimeField(blank=True, default=datetime.datetime.now),
        ),
    ]
