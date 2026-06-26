from django.urls import path
from .views import (
    PromocionListView,
    PromocionDetailView,
    MedioDePagoListView,
    DiaSemanaListView,
    AgregarPromocionFavoritaView,
    QuitarPromocionFavoritaView,
)

urlpatterns = [
    path('', PromocionListView.as_view(), name='promocion-list'),
    path('<int:pk>/', PromocionDetailView.as_view(), name='promocion-detail'),
    path('<int:pk>/agregar-favorito/', AgregarPromocionFavoritaView.as_view(), name='agregar-promo-favorita'),
    path('<int:pk>/quitar-favorito/', QuitarPromocionFavoritaView.as_view(), name='quitar-promo-favorita'),
    path('medios-de-pago/', MedioDePagoListView.as_view(), name='medio-de-pago-list'),
    path('dias-semana/', DiaSemanaListView.as_view(), name='dia-semana-list'),
]
