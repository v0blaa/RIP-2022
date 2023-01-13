"""medicine URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from medicine_app import views
from rest_framework import routers

farm_group_router = routers.DefaultRouter()
farm_group_router.register(r'farm_groups', views.FarmGroupViewSet)

status_router = routers.DefaultRouter()
status_router.register(r'statuses', views.StatusViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path(r'auth/', include('djoser.urls')),
    re_path(r'auth/', include('djoser.urls.jwt')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path(r'medicine/', views.MedicineViewSet.as_view(), name='medicine'),
    path('medicine/<int:pk>/', views.MedicineOneViewSet.as_view(), name='one medicine'),
    path(r'short_medicine/', views.ShortMedicineViewSet.as_view(), name='short medicine'),
    path('short_medicine/<int:pk>/', views.ShortMedicineOneViewSet.as_view(), name='one short medicine'),
    path(r'orders/', views.OrderViewSet.as_view(), name='orders'),
    path(r'orders/<int:pk>/', views.OrdersOneViewSet.as_view(), name='one order'),
    path(r'full_orders/', views.FullOrderViewSet.as_view(), name='full orders'),
    path(r'full_orders/<int:pk>/', views.FullOrdersOneViewSet.as_view(), name='one full order'),
    path(r'products/', views.ProductInOrderViewSet.as_view(), name='products'),
    path(r'products/<int:pk>/', views.ProductInOrderOneViewSet.as_view(), name='one product'),
    path(r'full_products/', views.FullProductInOrderViewSet.as_view(), name='full products'),
    path(r'full_products/<int:pk>/', views.FullProductInOrderOneViewSet.as_view(), name='one full product'),
    path(r'userinfo/', views.UserInfoViewSet.as_view(), name='users'),
    path(r'userinfo/<int:pk>/', views.OneUserInfoViewSet.as_view(), name='one user'),
    path('', include(farm_group_router.urls)),
    path('', include(status_router.urls)),
]
