from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.conf import settings
import razorpay

import hmac
import hashlib
from rest_framework.decorators import api_view

from .models import Payment
from .serializers import PaymentSerializer
from apps.order.models import Order  # adjust if needed

# initialize Razorpay client
client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_razorpay_order(request):
    order_id = request.data.get("order_id")
    if not order_id:
        return Response({"error": "order_id is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        order = Order.objects.get(id=order_id, user=request.user)
    except Order.DoesNotExist:
        return Response({"error": "Invalid order ID"}, status=status.HTTP_404_NOT_FOUND)

    # create Razorpay order
    razorpay_order = client.order.create({
        "amount": int(order.total * 100),  # amount in paise
        "currency": "INR",
        "payment_capture": 1
    })

    # create a local Payment record
    payment = Payment.objects.create(
        order=order,
        razorpay_order_id=razorpay_order["id"],
        amount=order.total,
        status="initiated"
    )

    return Response({
        "order_id": order.id,
        "razorpay_order_id": razorpay_order["id"],
        "amount": razorpay_order["amount"],
        "currency": razorpay_order["currency"],
        "razorpay_key": settings.RAZORPAY_KEY_ID,
    })




@api_view(["POST"])
@permission_classes([IsAuthenticated])
def verify_payment(request):
    """
    Verify Razorpay payment signature and update Payment + Order status.
    """
    razorpay_order_id = request.data.get("razorpay_order_id")
    razorpay_payment_id = request.data.get("razorpay_payment_id")
    razorpay_signature = request.data.get("razorpay_signature")

    if not (razorpay_order_id and razorpay_payment_id and razorpay_signature):
        return Response({"error": "Missing required fields."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        payment = Payment.objects.get(razorpay_order_id=razorpay_order_id)
    except Payment.DoesNotExist:
        return Response({"error": "Payment not found."}, status=status.HTTP_404_NOT_FOUND)

    # Generate signature
    generated_signature = hmac.new(
        key=settings.RAZORPAY_KEY_SECRET.encode(),
        msg=f"{razorpay_order_id}|{razorpay_payment_id}".encode(),
        digestmod=hashlib.sha256
    ).hexdigest()

    if hmac.compare_digest(generated_signature, razorpay_signature):
        payment.status = "successful"
        payment.razorpay_payment_id = razorpay_payment_id
        payment.razorpay_signature = razorpay_signature
        payment.save()

        # Update linked order
        payment.status = "PAID"
        payment.save(update_fields=["status"])

        return Response({"message": "Payment verified successfully."}, status=status.HTTP_200_OK)

    # Signature mismatch
    payment.status = "failed"
    payment.save(update_fields=["status"])
    return Response({"error": "Signature verification failed."}, status=status.HTTP_400_BAD_REQUEST)
