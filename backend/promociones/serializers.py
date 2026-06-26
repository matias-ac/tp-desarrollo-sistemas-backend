from rest_framework import serializers
from entidades.serializers import EntidadOferenteSerializer
from .models import Promocion, MedioDePago, DiaSemana


class PromocionSerializer(serializers.ModelSerializer):
    entidad_oferente = EntidadOferenteSerializer(read_only=True)

    class Meta:
        model = Promocion
        fields = [
            'id',
            'titulo',
            'descripcion',
            'porcentaje_descuento',
            'tope_reintegro',
            'cuotas_disponibles',
            'fecha_inicio',
            'fecha_fin',
            'condiciones_legales',
            'entidad_oferente',
            'supermercados',
            'medios_de_pago',
            'dias_semana',
        ]


class MedioDePagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedioDePago
        fields = ['id', 'descripcion']


class DiaSemanaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiaSemana
        fields = ['id', 'nombre']