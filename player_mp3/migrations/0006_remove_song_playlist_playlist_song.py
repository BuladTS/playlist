# Generated by Django 4.1.3 on 2022-11-19 14:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('player_mp3', '0005_playlist_song_playlist'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='song',
            name='playlist',
        ),
        migrations.AddField(
            model_name='playlist',
            name='song',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='player_mp3.song'),
        ),
    ]
