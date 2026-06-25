from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from .models import Promocion, MedioDePago, DiaSemana
from .serializers import PromocionSerializer, MedioDePagoSerializer, DiaSemanaSerializer


class PromocionListView(generics.ListAPIView):
    queryset = Promocion.objects.all()
    serializer_class = PromocionSerializer
    filterset_fields = ['supermercados', 'dias_semana']


class PromocionDetailView(generics.RetrieveAPIView):
    queryset = Promocion.objects.all()
    serializer_class = PromocionSerializer


class MedioDePagoListView(generics.ListAPIView):
    queryset = MedioDePago.objects.all()
    serializer_class = MedioDePagoSerializer


class DiaSemanaListView(generics.ListAPIView):
    queryset = DiaSemana.objects.all()
    serializer_class = DiaSemanaSerializer