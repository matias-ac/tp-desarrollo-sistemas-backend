from rest_framework import generics
from .models import Supermercado, EntidadOferente
from .serializers import SupermercadoSerializer, EntidadOferenteSerializer


class SupermercadoListView(generics.ListAPIView):
    queryset = Supermercado.objects.all()
    serializer_class = SupermercadoSerializer


class EntidadOferenteListView(generics.ListAPIView):
    queryset = EntidadOferente.objects.all()
    serializer_class = EntidadOferenteSerializer