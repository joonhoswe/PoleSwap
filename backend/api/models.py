from django.db import models
from django.contrib.postgres.fields import ArrayField

class Object(models.Model):
    #columns of the database
    #CharField(): used for string
    #PositiveIntegerField(): used for int
    owner = models.CharField(max_length=20, default='admin')

    def __str__(self):
        return self.address