# Generated by Django 4.0.5 on 2022-06-25 21:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Proekt', '0006_examplescontainer_database_image_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='exercise',
            name='number',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
