from rest_framework import serializers
from .models import Usuario


class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    promociones_favoritas = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    supermercados_favoritos = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Usuario
        fields = [
            'id', 'email', 'first_name', 'last_name', 'password',
            'promociones_favoritas', 'supermercados_favoritos',
        ]

    def validate_email(self, value):
        if Usuario.objects.filter(email=value).exists():
            raise serializers.ValidationError("Ya existe un usuario con ese email.")
        return value

    def create(self, validated_data):
        validated_data['username'] = validated_data['email']
        password = validated_data.pop('password')
        usuario = Usuario(**validated_data)
        usuario.set_password(password)
        usuario.save()
        return usuario