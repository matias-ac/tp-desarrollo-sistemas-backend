from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from .models import Promocion
from .serializers import PromocionSerializer


class PromocionListView(generics.ListAPIView):
    queryset = Promocion.objects.all()
    serializer_class = PromocionSerializer
    filterset_fields = ['supermercados', 'dias_semana']


class PromocionDetailView(generics.RetrieveAPIView):
    queryset = Promocion.objects.all()
    serializer_class = PromocionSerializer