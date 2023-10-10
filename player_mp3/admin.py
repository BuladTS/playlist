from django.contrib import admin

from player_mp3.models import Song, Playlist

admin.site.register(Song)
admin.site.register(Playlist)