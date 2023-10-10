from django.db import models


class Playlist(models.Model):
    """
    Модель плейлиста
    """
    name = models.CharField('Название', max_length=50)
    queue = models.JSONField('Очередь', default={"queue": []})

    def __str__(self):
        return self.name


class Song(models.Model):
    """
    Модель песни
    """
    audio_file = models.FileField('Аудиодорожка', upload_to='player_mp3/static/media/')
    artist = models.CharField('Артист', max_length=50)
    song_name = models.CharField('Название', max_length=50)
    playlists = models.ManyToManyField(Playlist)

    def __str__(self):
        return self.artist + '-' + self.song_name
