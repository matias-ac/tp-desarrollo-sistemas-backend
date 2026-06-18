from django.db import models


class MedioDePago(models.Model):
    descripcion = models.CharField(max_length=100)

    def __str__(self):
        return self.descripcion


class DiaSemana(models.Model):
    nombre = models.CharField(max_length=20)

    def __str__(self):
        return self.nombre