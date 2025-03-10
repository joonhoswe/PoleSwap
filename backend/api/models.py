from django.db import models
from datetime import datetime
from django.utils import timezone
from decimal import Decimal

class Object(models.Model):
    brand = models.CharField(max_length=50, default='not specified')
    length = models.FloatField(max_length=20, default='0.0')
    flex = models.DecimalField(max_digits=4, decimal_places=2, default=Decimal('0.00'))
    weight = models.IntegerField(default='-1')
    condition = models.CharField(max_length=20, default='not specified')
    size = models.CharField(max_length=30, default='n/a')
    itemCategory = models.CharField(max_length=20, null=True, blank=True)
    price = models.DecimalField(max_digits=9, decimal_places=2, default=Decimal('0.00'))
    title = models.CharField(max_length=100, default='not specified')
    description = models.CharField(max_length=500, default='not specified')
    image_urls = models.JSONField(default=list)
    owner = models.CharField(max_length=50, default='admin')
    date_time_posted = models.DateTimeField(default = timezone.now, blank=True)
    saved = models.JSONField(default=list, blank=True)
    state = models.CharField(max_length=50, default='not specified')
    city = models.CharField(max_length=100, default='not specified')

    class Meta:
        db_table = 'Listings'

    def __str__(self):
        return f"{self.brand} {self.length}' - ${self.price}"