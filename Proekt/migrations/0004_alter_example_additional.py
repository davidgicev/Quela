# Generated by Django 4.0.5 on 2022-06-25 15:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Proekt', '0003_example_code_alter_example_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='example',
            name='additional',
            field=models.TextField(null=True),
        ),
    ]