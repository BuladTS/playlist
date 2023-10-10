from django import forms
from django.forms import FileInput, TextInput

from player_mp3.models import Song, Playlist


class SongForm(forms.ModelForm):
    """
    Форма для получения данных песни
    """
    class Meta:
        model = Song
        fields = ['audio_file', 'artist', 'song_name']

        widgets = {
            "audio_file": FileInput(attrs={
                "class": "form-control",
                "type": "file"
            }),
            "artist": TextInput(attrs={
                "class": "form-control",
            }),
            "song_name": TextInput(attrs={
                "class": "form-control",
            }),
        }


class PlaylistForm(forms.ModelForm):
    """
    Форма для получения плейлиста
    """
    class Meta:
        model = Playlist
        fields = ['name']

        widgets = {
            "name": TextInput(attrs={
                "class": "form-control songs",
                "style": ""
            })
        }

    playlist_songs_id = forms.JSONField()
    playlist_songs_id.widget.attrs.update({'class': 'form-control hidden'})


class DeleteSongForm(forms.Form):
    """
    Форма для получения данных для удаления песни
    """
    songs_id = forms.JSONField()
    songs_id.widget.attrs.update({'class': 'form-control hidden'})


class DeletePlaylistForm(forms.Form):
    playlists_id = forms.JSONField()
    playlists_id.widget.attrs.update({'class': 'form-control hidden'})


class SwapQueuePlaylistForm(forms.Form):
    """
    Форма для получения данных о смене порядка
    """
    swap_playlist_queue = forms.IntegerField()
    swap_playlist_queue.widget.attrs.update({'class': 'form-control hidden'})

    swap_songs_id = forms.JSONField()
    swap_songs_id.widget.attrs.update({'class': 'form-control hidden'})


class RedactionPlaylistForm(forms.Form):
    """
    Форма для получения данных о редактировании плейлиста
    """
    delete_or_append = forms.IntegerField()
    delete_or_append.widget.attrs.update({'class': 'form-control hidden'})

    redacted_playlist = forms.IntegerField()
    redacted_playlist.widget.attrs.update({'class': 'form-control hidden'})

    moved_songs = forms.JSONField()
    moved_songs.widget.attrs.update({'class': 'form-control hidden'})
