import boto3
from botocore.exceptions import NoCredentialsError, ClientError
import os

def upload_to_s3(file, bucket_name, object_name=None):
    print("AWS Access Key:", os.environ.get('AWS_ACCESS_KEY'))  # Debugging line
    print("AWS Secret Key:", os.environ.get('AWS_SECRET_ACCESS_KEY'))  # Debugging line
    print("Bucket Name:", bucket_name)  # Debugging line
    s3_client = boto3.client(
        's3',
        aws_access_key_id=os.environ.get('AWS_ACCESS_KEY'),
        aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'),
        region_name=os.environ.get('AWS_REGION')
    )

    try:
        if object_name is None:
            object_name = file.name

        s3_client.upload_fileobj(file, bucket_name, object_name)
        return f"https://{bucket_name}.s3.{os.environ.get('AWS_REGION')}.amazonaws.com/{object_name}"
    except NoCredentialsError:
        print("Credentials not available")
        return None
    except ClientError as e:
        print(f"Client error: {e.response['Error']['Message']}")
        return None
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return None
