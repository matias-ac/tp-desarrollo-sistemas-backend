from django.contrib import admin
from .models import Promocion, MedioDePago, DiaSemana

admin.site.register(MedioDePago)
admin.site.register(DiaSemana)


@admin.register(Promocion)
class PromocionAdmin(admin.ModelAdmin):
    list_display = ("titulo", "porcentaje_descuento", "fecha_inicio", "fecha_fin")
    list_filter = ("supermercados", "dias_semana")
    search_fields = ("titulo", "descripcion")
    filter_horizontal = ("supermercados", "medios_de_pago", "dias_semana")