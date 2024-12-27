from django.db import models
from datetime import datetime
from django.utils import timezone

class Object(models.Model):
    brand = models.CharField(max_length=50, default='not specified')
    length = models.FloatField(max_length=20, default='not specified')
    weight = models.IntegerField(default='not specified')
    condition = models.CharField(max_length=20, default='not specified')
    price = models.DecimalField(max_digits=9, decimal_places=2, default='not specified')
    title = models.CharField(max_length=100, default='not specified')
    description = models.CharField(max_length=500, default='not specified')
    image_urls = models.JSONField(default=list)
    owner = models.CharField(max_length=50, default='admin')
    date_time_posted = models.DateTimeField(default = timezone.now, blank=True)
    saved = models.JSONField(default=list, blank=True)

    def __str__(self):
        return f"{self.brand} {self.length}' - ${self.price}"