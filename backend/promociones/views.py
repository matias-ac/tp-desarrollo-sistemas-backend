from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
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


class AgregarPromocionFavoritaView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            promocion = Promocion.objects.get(pk=pk)
        except Promocion.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        request.user.promociones_favoritas.add(promocion)
        return Response(status=status.HTTP_204_NO_CONTENT)


class QuitarPromocionFavoritaView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            promocion = Promocion.objects.get(pk=pk)
        except Promocion.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        request.user.promociones_favoritas.remove(promocion)
        return Response(status=status.HTTP_204_NO_CONTENT)