import razorpay
from django.conf import settings
from django.utils.crypto import get_random_string


razorpay_client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))



def generate_order_id(prefix="ORD"):
    random_part = get_random_string(length=7, allowed_chars="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ")
    return f"{prefix}{random_part}"
