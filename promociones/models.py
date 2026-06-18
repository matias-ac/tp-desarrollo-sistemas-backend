from django.db import models


class MedioDePago(models.Model):
    descripcion = models.CharField(max_length=100)

    def __str__(self):
        return self.descripcion


class DiaSemana(models.Model):
    nombre = models.CharField(max_length=20)

    def __str__(self):
        return self.nombre


class Promocion(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    porcentajeDescuento = models.DecimalField(max_digits=5, decimal_places=2)
    topeReintegro = models.DecimalField(max_digits=10, decimal_places=2)
    cuotasDisponibles = models.IntegerField()
    fechaInicio = models.DateField()
    fechaFin = models.DateField()
    condicionesLegales = models.TextField()

    def __str__(self):
        return self.titulo
