# Generated by Django 4.0.5 on 2022-06-25 18:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Proekt', '0005_exercise_lecture_alter_example_additional'),
    ]

    operations = [
        migrations.AddField(
            model_name='examplescontainer',
            name='database_image',
            field=models.ImageField(default=1, upload_to=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='exercise',
            name='database_image',
            field=models.ImageField(default=1, upload_to=''),
            preserve_default=False,
        ),
    ]