from django.urls import path
from .views import PromocionListView, PromocionDetailView

urlpatterns = [
    path('', PromocionListView.as_view(), name='promocion-list'),
    path('<int:pk>/', PromocionDetailView.as_view(), name='promocion-detail'),
]