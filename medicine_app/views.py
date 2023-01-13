from django.shortcuts import render
from medicine_app.models import Statuses, FarmGroup, \
    Medicine, Orders, ProductInOrder
from medicine_app.filters import MedicineFilter, \
    OrderFilter, ProductInOrderFilter, UserFilter, \
    ShortMedicineFilter
from medicine_app.serializers import StatusSerializer, \
    FarmGroupSerializer, MedicineSerializer, OrderSerializer, \
    ProductInOrderSerializer, CustomUserSerializer, \
    FullOrderSerializer, FullProductInOrderSerializer, \
    ShortMedicineSerializer
from django.contrib.auth.models import User
from rest_framework import viewsets, filters, generics
from medicine_app.permissions import IsAdminOrReadOnly, IsAuthOwnerOrAdmin
import django_filters


class FarmGroupViewSet(viewsets.ModelViewSet):
    queryset = FarmGroup.objects.all()
    serializer_class = FarmGroupSerializer
    permission_classes = ()


class StatusViewSet(viewsets.ModelViewSet):
    queryset = Statuses.objects.all()
    serializer_class = StatusSerializer
    permission_classes = ()


class MedicineViewSet(generics.ListCreateAPIView):
    search_fields = ['name']
    ordering_fields = ['price', 'farm_group_id']
    filter_backends = (filters.SearchFilter, django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter, )
    filterset_class = MedicineFilter
    queryset = Medicine.objects.all()
    name = 'Medicine'
    serializer_class = MedicineSerializer
    permission_classes = (IsAdminOrReadOnly, )


class MedicineOneViewSet(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MedicineSerializer
    queryset = Medicine.objects.all()
    permission_classes = ()


class OrderViewSet(generics.ListCreateAPIView):
    ordering_fields = ['user_id', 'status_id']
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter,)
    filterset_class = OrderFilter
    queryset = Orders.objects.all()
    name = 'Orders'
    serializer_class = OrderSerializer
    permission_classes = (IsAuthOwnerOrAdmin, )


class OrdersOneViewSet(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = OrderSerializer
    queryset = Orders.objects.all()
    permission_classes = ()


class ProductInOrderViewSet(generics.ListCreateAPIView):
    ordering_fields = ['user_id', 'status_id']
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter,)
    filterset_class = ProductInOrderFilter
    queryset = ProductInOrder.objects.all()
    name = 'Product in order'
    serializer_class = ProductInOrderSerializer
    permission_classes = (IsAuthOwnerOrAdmin,)


class ProductInOrderOneViewSet(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductInOrderSerializer
    queryset = ProductInOrder.objects.all()
    permission_classes = ()


class FullOrderViewSet(generics.ListCreateAPIView):
    ordering_fields = ['user_id', 'status_id']
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter,)
    filterset_class = OrderFilter
    queryset = Orders.objects.all()
    name = 'Orders'
    serializer_class = FullOrderSerializer
    permission_classes = (IsAuthOwnerOrAdmin,)


class FullOrdersOneViewSet(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FullOrderSerializer
    queryset = Orders.objects.all()
    permission_classes = ()


class FullProductInOrderViewSet(generics.ListCreateAPIView):
    ordering_fields = ['user_id', 'status_id']
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter,)
    filterset_class = ProductInOrderFilter
    queryset = ProductInOrder.objects.all()
    name = 'Product in order'
    serializer_class = FullProductInOrderSerializer
    permission_classes = (IsAuthOwnerOrAdmin,)


class FullProductInOrderOneViewSet(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FullProductInOrderSerializer
    queryset = ProductInOrder.objects.all()
    permission_classes = ()


class ShortMedicineViewSet(generics.ListCreateAPIView):
    search_fields = ['name']
    ordering_fields = ['price', 'farm_group.id']
    filter_backends = (filters.SearchFilter, django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter, )
    filterset_class = ShortMedicineFilter
    queryset = Medicine.objects.all()
    name = 'Short Medicine'
    serializer_class = ShortMedicineSerializer
    permission_classes = (IsAdminOrReadOnly, )


class ShortMedicineOneViewSet(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ShortMedicineSerializer
    queryset = Medicine.objects.all()
    permission_classes = ()


class UserInfoViewSet(generics.ListCreateAPIView):
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
    filterset_class = UserFilter
    serializer_class = CustomUserSerializer
    queryset = User.objects.all()
    permission_classes = ()


class OneUserInfoViewSet(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CustomUserSerializer
    queryset = User.objects.all()
    permission_classes = ()


# Create your views here.
