# Generated by Django 2.0.1 on 2018-03-26 07:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('maincrawler', '0004_auto_20180326_0658'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='geniespider',
            name='items_structure',
        ),
        migrations.AddField(
            model_name='extractor',
            name='spider',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='extractor', to='maincrawler.GenieSpider'),
            preserve_default=False,
        ),
    ]
