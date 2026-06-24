from django.urls import path
from .views import SupermercadoListView, EntidadOferenteListView

urlpatterns = [
    path('supermercados/', SupermercadoListView.as_view(), name='supermercado-list'),
    path('oferentes/', EntidadOferenteListView.as_view(), name='entidad-oferente-list'),
]