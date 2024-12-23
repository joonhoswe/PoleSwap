from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Object
from .serializers import ObjectSerializer
from .utils import upload_to_s3
import os

# get
@api_view(['POST'])
def createObject(request):
    # 1) Pull the raw files
    images = request.FILES.getlist('images')
    image_urls = []

    for image in images:
        image_url = upload_to_s3(image, os.environ.get('AWS_BUCKET_NAME'))
        if image_url:
            image_urls.append(image_url)

    if not image_urls:
        return Response(
            {'image_urls': 'At least one image is required.'}, 
            status=status.HTTP_400_BAD_REQUEST
        )

    # 2) Manually extract fields from request.data
    #    (Avoid request.data.copy())
    brand = request.data.get('brand')
    length = request.data.get('length')
    weight = request.data.get('weight')
    condition = request.data.get('condition')
    price = request.data.get('price')
    
    # 3) Build a plain dictionary including image_urls
    serializer_data = {
        'brand': brand,
        'length': length,
        'weight': weight,
        'condition': condition,
        'price': price,
        'image_urls': image_urls,
    }

    # 4) Validate & save with serializer
    serializer = ObjectSerializer(data=serializer_data)
    if serializer.is_valid():
        serializer.save()  
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# retrieve
@api_view(['GET'])
def getObjects(request):
    if request.method == 'GET':
        #get all the Objects from the database
        Objects = Object.objects.all()
        #serialize the Objects
        serializer = ObjectSerializer(Objects, many=True)
        #return the serialized Objects
        return Response(serializer.data)

# delete 
@api_view(['DELETE'])
def deleteObject(request, id):
    Object = get_object_or_404(Object, id=id)
    if request.method == 'DELETE':
        Object.delete()
        return Response({'message': 'Object deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

# patch
@api_view(['PATCH'])
def updateObject(request):
    if request.method == 'PATCH':
        id = request.data.get('id')

        if not id:
            return Response({'error': 'ID required'}, status=status.HTTP_400_BAD_REQUEST)
        
        Object = get_object_or_404(Object, id=id)

        Object.save()

        return Response({'message': 'Successfully updated'}, status=status.HTTP_200_OK)