from django.db import models

# Create your models here.


class Lecture(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()


class ExamplesContainer(models.Model):
    database_model = models.TextField()
    lecture = models.ForeignKey(Lecture, on_delete=models.CASCADE)
    database_image = models.ImageField()


class Example(models.Model):
    container = models.ForeignKey(ExamplesContainer, on_delete=models.CASCADE)
    number = models.IntegerField()
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    code = models.TextField()
    additional = models.TextField(null=True, blank=True)


class Exercise(models.Model):
    number = models.IntegerField()
    lecture = models.ForeignKey(Lecture, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    hint = models.CharField(max_length=100)
    solution = models.TextField()
    placeholder = models.TextField()
    database_model = models.TextField()
    database_image = models.ImageField()

