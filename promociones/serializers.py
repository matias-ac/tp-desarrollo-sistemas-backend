from rest_framework import serializers
from .models import MedioDePago, DiaSemana


class MedioDePagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedioDePago
        fields = ['id', 'descripcion']


class DiaSemanaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiaSemana
        fields = ['id', 'nombre']