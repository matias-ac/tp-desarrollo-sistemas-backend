from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Supermercado, EntidadOferente
from .serializers import SupermercadoSerializer, EntidadOferenteSerializer


class SupermercadoListView(generics.ListAPIView):
    queryset = Supermercado.objects.all()
    serializer_class = SupermercadoSerializer


class EntidadOferenteListView(generics.ListAPIView):
    queryset = EntidadOferente.objects.all()
    serializer_class = EntidadOferenteSerializer


class AgregarSupermercadoFavoritoView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            supermercado = Supermercado.objects.get(pk=pk)
        except Supermercado.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        request.user.supermercados_favoritos.add(supermercado)
        return Response(status=status.HTTP_204_NO_CONTENT)


class QuitarSupermercadoFavoritoView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            supermercado = Supermercado.objects.get(pk=pk)
        except Supermercado.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        request.user.supermercados_favoritos.remove(supermercado)
        return Response(status=status.HTTP_204_NO_CONTENT)