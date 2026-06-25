from rest_framework import serializers
from .models import Supermercado, EntidadOferente


class SupermercadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supermercado
        fields = ['id', 'nombre', 'logo']


class EntidadOferenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = EntidadOferente
        fields = ['id', 'nombre', 'logo', 'tipo']