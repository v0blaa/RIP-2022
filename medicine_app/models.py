from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Statuses(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'statuses'


class FarmGroup(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'farm_groups'


class Medicine(models.Model):
    name = models.CharField(max_length=50)
    indications_for_use = models.CharField(max_length=450)
    contraindications = models.CharField(max_length=450)
    other_info = models.CharField(max_length=450)
    price = models.IntegerField()
    count = models.IntegerField()
    farm_group = models.ForeignKey(FarmGroup, on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'medicine'


class Orders(models.Model):
    count = models.IntegerField()
    paid_date = models.DateTimeField()
    sent_date = models.DateTimeField()
    delivered_date = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.ForeignKey(Statuses, on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'orders'


class ProductInOrder(models.Model):
    count = models.IntegerField()
    paid_date = models.DateTimeField()
    sent_date = models.DateTimeField()
    delivered_date = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    medicine = models.ForeignKey(Medicine, on_delete=models.CASCADE)
    order = models.ForeignKey(Orders, related_name='products', on_delete=models.CASCADE)
    status = models.ForeignKey(Statuses, on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'product_in_order'





