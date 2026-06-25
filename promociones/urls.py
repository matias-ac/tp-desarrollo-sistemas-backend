from django.urls import path
from .views import PromocionListView, PromocionDetailView, MedioDePagoListView, DiaSemanaListView

urlpatterns = [
    path('', PromocionListView.as_view(), name='promocion-list'),
    path('<int:pk>/', PromocionDetailView.as_view(), name='promocion-detail'),
    path('medios-de-pago/', MedioDePagoListView.as_view(), name='medio-de-pago-list'),
    path('dias-semana/', DiaSemanaListView.as_view(), name='dia-semana-list'),
]