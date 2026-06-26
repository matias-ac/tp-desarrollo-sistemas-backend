from django.urls import path
from .views import (
    RegistroUsuarioView,
    PerfilUsuarioView,
    AgregarPromocionFavoritaView,
    QuitarPromocionFavoritaView,
    AgregarSupermercadoFavoritoView,
    QuitarSupermercadoFavoritoView,
)

urlpatterns = [
    path('registro/', RegistroUsuarioView.as_view(), name='registro'),
    path('perfil/', PerfilUsuarioView.as_view(), name='perfil'),
    path('favoritos/promociones/<int:pk>/agregar/', AgregarPromocionFavoritaView.as_view(), name='agregar-promo-favorita'),
    path('favoritos/promociones/<int:pk>/quitar/', QuitarPromocionFavoritaView.as_view(), name='quitar-promo-favorita'),
    path('favoritos/supermercados/<int:pk>/agregar/', AgregarSupermercadoFavoritoView.as_view(), name='agregar-super-favorito'),
    path('favoritos/supermercados/<int:pk>/quitar/', QuitarSupermercadoFavoritoView.as_view(), name='quitar-super-favorito'),
]