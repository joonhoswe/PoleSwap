# Generated by Django 5.1.4 on 2025-03-08 17:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_alter_object_table'),
    ]

    operations = [
        migrations.AddField(
            model_name='object',
            name='itemCategory',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='object',
            name='size',
            field=models.CharField(default='n/a', max_length=7),
        ),
    ]
