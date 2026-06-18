from django.contrib.auth.models import AbstractUser
from django.db import models


class Usuario(AbstractUser):
    supermercados_favoritos = models.ManyToManyField(
        "entidades.Supermercado", related_name="usuarios_favoritos", blank=True
    )
    promociones_favoritas = models.ManyToManyField(
        "promociones.Promocion", related_name="usuarios_favoritos", blank=True
    )

    def __str__(self):
        nombre_completo = f"{self.first_name} {self.last_name}".strip()
        return nombre_completo or self.email or self.username
