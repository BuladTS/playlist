# Generated by Django 4.1.3 on 2022-11-19 15:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('player_mp3', '0008_remove_song_playlist_song_playlist'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='song',
            name='playlist',
        ),
        migrations.AddField(
            model_name='song',
            name='playlists',
            field=models.ManyToManyField(to='player_mp3.playlist'),
        ),
    ]
