# Generated by Django 4.1.3 on 2022-11-19 15:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('player_mp3', '0007_remove_playlist_song_song_playlist'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='song',
            name='playlist',
        ),
        migrations.AddField(
            model_name='song',
            name='playlist',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='player_mp3.playlist'),
        ),
    ]
