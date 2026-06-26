from django.urls import path
from .views import (
    SupermercadoListView,
    EntidadOferenteListView,
    AgregarSupermercadoFavoritoView,
    QuitarSupermercadoFavoritoView,
)

urlpatterns = [
    path('supermercados/', SupermercadoListView.as_view(), name='supermercado-list'),
    path('supermercados/<int:pk>/agregar-favorito/', AgregarSupermercadoFavoritoView.as_view(), name='agregar-super-favorito'),
    path('supermercados/<int:pk>/quitar-favorito/', QuitarSupermercadoFavoritoView.as_view(), name='quitar-super-favorito'),
    path('oferentes/', EntidadOferenteListView.as_view(), name='entidad-oferente-list'),
]
