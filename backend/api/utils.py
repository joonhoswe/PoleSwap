import boto3
from botocore.exceptions import NoCredentialsError, ClientError

def upload_to_s3(file, bucket_name, object_name=None):
    s3_client = boto3.client(
        's3',
        aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'),
        region_name=os.environ.get('AWS_S3_REGION_NAME')
    )

    try:
        if object_name is None:
            object_name = file.name

        s3_client.upload_fileobj(file, bucket_name, object_name)
        return f"https://{bucket_name}.s3.amazonaws.com/{object_name}"
    except (NoCredentialsError, ClientError) as e:
        print(f"Error uploading to S3: {e}")
        return None
