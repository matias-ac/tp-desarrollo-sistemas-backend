from django.urls import path
from .views import MedioDePagoListView, DiaSemanaListView

urlpatterns = [
    path('medios-de-pago/', MedioDePagoListView.as_view(), name='medio-de-pago-list'),
    path('dias-semana/', DiaSemanaListView.as_view(), name='dia-semana-list'),
]