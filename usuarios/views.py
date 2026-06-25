from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Usuario
from .serializers import UsuarioSerializer
from promociones.models import Promocion
from entidades.models import Supermercado


class RegistroUsuarioView(generics.CreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [permissions.AllowAny]


class PerfilUsuarioView(generics.RetrieveAPIView):
    serializer_class = UsuarioSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class AgregarPromocionFavoritaView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        promocion = Promocion.objects.filter(pk=pk).first()
        if not promocion:
            return Response({"error": "Promoción no encontrada."}, status=status.HTTP_404_NOT_FOUND)
        request.user.promociones_favoritas.add(promocion)
        return Response({"mensaje": "Promoción agregada a favoritos."}, status=status.HTTP_200_OK)


class QuitarPromocionFavoritaView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        promocion = Promocion.objects.filter(pk=pk).first()
        if not promocion:
            return Response({"error": "Promoción no encontrada."}, status=status.HTTP_404_NOT_FOUND)
        request.user.promociones_favoritas.remove(promocion)
        return Response({"mensaje": "Promoción quitada de favoritos."}, status=status.HTTP_200_OK)


class AgregarSupermercadoFavoritoView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        supermercado = Supermercado.objects.filter(pk=pk).first()
        if not supermercado:
            return Response({"error": "Supermercado no encontrado."}, status=status.HTTP_404_NOT_FOUND)
        request.user.supermercados_favoritos.add(supermercado)
        return Response({"mensaje": "Supermercado agregado a favoritos."}, status=status.HTTP_200_OK)


class QuitarSupermercadoFavoritoView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        supermercado = Supermercado.objects.filter(pk=pk).first()
        if not supermercado:
            return Response({"error": "Supermercado no encontrado."}, status=status.HTTP_404_NOT_FOUND)
        request.user.supermercados_favoritos.remove(supermercado)
        return Response({"mensaje": "Supermercado quitado de favoritos."}, status=status.HTTP_200_OK)