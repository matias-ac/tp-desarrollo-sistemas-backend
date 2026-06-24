from rest_framework import serializers
from .models import Promocion


class PromocionSerializer(serializers.ModelSerializer):
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