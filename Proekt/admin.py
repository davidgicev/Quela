from django.contrib import admin

# Register your models here.
from django.contrib.auth.admin import UserAdmin

from Proekt.models import Lecture, Exercise, ExamplesContainer, Example

admin.site.register(Lecture)
admin.site.register(Exercise)
admin.site.register(ExamplesContainer)
admin.site.register(Example)

