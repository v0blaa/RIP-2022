from django_filters import FilterSet, AllValuesFilter
from django_filters import DateTimeFilter, NumberFilter, DateTimeFromToRangeFilter
from medicine_app.models import Medicine, Orders, ProductInOrder
from django.contrib.auth.models import User


class MedicineFilter(FilterSet):
    min_price = NumberFilter(field_name='price', lookup_expr='gte')
    max_price = NumberFilter(field_name='price', lookup_expr='lte')
    farm_group_id = NumberFilter(field_name='farm_group_id')

    class Meta:
        model = Medicine
        fields = ['min_price', 'max_price', 'farm_group_id']


class ShortMedicineFilter(FilterSet):
    min_price = NumberFilter(field_name='price', lookup_expr='gte')
    max_price = NumberFilter(field_name='price', lookup_expr='lte')
    farm_group_id = NumberFilter(field_name='farm_group_id')

    class Meta:
        model = Medicine
        fields = ['min_price', 'max_price', 'farm_group_id']


class OrderFilter(FilterSet):
    user_id = NumberFilter(field_name='user_id')
    status_id = AllValuesFilter(field_name='status_id')
    date = DateTimeFromToRangeFilter(field_name='paid_date')

    class Meta:
        model = Orders
        fields = ['user_id', 'status_id', 'paid_date']


class ProductInOrderFilter(FilterSet):
    user_id = NumberFilter(field_name='user_id')
    status_id = AllValuesFilter(field_name='status_id')

    class Meta:
        model = ProductInOrder
        fields = ['user_id', 'status_id']


class UserFilter(FilterSet):
    id = NumberFilter(field_name='id')
    username = AllValuesFilter(field_name='username')
    email = AllValuesFilter(field_name='email')
    first_name = AllValuesFilter(field_name='first_name')

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name']