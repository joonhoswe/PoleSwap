# Generated by Django 5.1.4 on 2024-12-25 06:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_object_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='object',
            name='title',
            field=models.CharField(default='not specified', max_length=100),
        ),
    ]
