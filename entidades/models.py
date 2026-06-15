from django.db import models


class Supermercado(models.Model):
    nombre = models.CharField(max_length=200)
    logo = models.URLField(max_length=500, blank=True)

    def __str__(self):
        return self.nombre


class EntidadOferente(models.Model):
    TIPO_CHOICES = [
        ("supermercado", "Supermercado"),
        ("banco", "Banco"),
        ("otro", "Otro"),
    ]

    nombre = models.CharField(max_length=200)
    logo = models.URLField(max_length=500, blank=True)
    tipo = models.CharField(max_length=30, choices=TIPO_CHOICES, default="supermercado")

    def __str__(self):
        return self.nombre