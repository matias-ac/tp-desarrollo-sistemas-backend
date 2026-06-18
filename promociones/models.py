from django.db import models


class MedioDePago(models.Model):
    descripcion = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.descripcion}"


class DiaSemana(models.Model):
    nombre = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.nombre}"


class Promocion(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    porcentaje_descuento = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    tope_reintegro = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    cuotas_disponibles = models.IntegerField(null=True, blank=True)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    condiciones_legales = models.TextField()

    def __str__(self):
        return f"{self.titulo}"
