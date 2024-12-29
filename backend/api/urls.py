from django.urls import path
from .views import *
from api import views

urlpatterns=[
    #arguments: 
    # 1. url pattern, 
    # 2. function to be called (from views.py)
    # 3. name which can be used to reference

    path('post/', createObject, name='createObject'),
    path('patch/', updateObject, name='updateObject'),
    path('update/<int:id>/', editObject, name='editObject'),
    path('get/', getObjects, name='getObjects'),
    path('get/<int:id>/', getObjectById, name='getObjectById'),
    path('delete/<int:id>/', deleteObject, name='deleteObject')
]
