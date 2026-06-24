from rest_framework import generics
from .models import MedioDePago, DiaSemana
from .serializers import MedioDePagoSerializer, DiaSemanaSerializer


class MedioDePagoListView(generics.ListAPIView):
    queryset = MedioDePago.objects.all()
    serializer_class = MedioDePagoSerializer


class DiaSemanaListView(generics.ListAPIView):
    queryset = DiaSemana.objects.all()
    serializer_class = DiaSemanaSerializer