from rest_framework import serializers
from .models import Object

#purpose: serializers in django's rest framework converts data
#types from foreign data types into python data types
class ObjectSerializer(serializers.ModelSerializer):
    class Meta:
        #sets model to the component from models.py
        model = Object
        #includes all fields of model
        fields = '__all__' 