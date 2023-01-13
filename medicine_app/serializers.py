from medicine_app.models import FarmGroup, Medicine, Orders, ProductInOrder, Statuses
from rest_framework import serializers
from djoser.serializers import UserSerializer
from django.contrib.auth.models import User
from django.db.models import Sum


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statuses
        fields = ["id", "name"]


class FarmGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = FarmGroup
        fields = ["id", "name"]


class MedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicine
        fields = ["id", "name", "indications_for_use", "contraindications", "other_info",
                  "price", "count", "farm_group"]


class ShortMedicineSerializer(serializers.ModelSerializer):
    farm_group = serializers.SlugField(source='farm_group.name')

    class Meta:
        model = Medicine
        fields = ["id", "name", "price", "count", "farm_group"]


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = ["id", "count", "paid_date", "sent_date", "delivered_date",
                  "user", "status"]


class ProductInOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductInOrder
        fields = ["id", "count", "paid_date", "sent_date", "delivered_date",
                  "user", "medicine", "order", "status"]


class CustomUserSerializer(UserSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'is_staff']


class FullProductInOrderSerializer(serializers.ModelSerializer):
    medicine = ShortMedicineSerializer()

    class Meta:
        model = ProductInOrder
        fields = ["id", "count", "paid_date", "sent_date", "delivered_date",
                  "user", "medicine", "order", "status"]


class FullOrderSerializer(serializers.ModelSerializer):
    products = FullProductInOrderSerializer(read_only=True, many=True)

    class Meta:
        model = Orders
        fields = '__all__'

