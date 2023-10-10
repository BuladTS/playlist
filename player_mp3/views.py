from django.shortcuts import render

from player_mp3.models import Song, Playlist
from Плейлист.forms import SongForm, PlaylistForm, DeleteSongForm, DeletePlaylistForm, SwapQueuePlaylistForm
from Плейлист.forms import RedactionPlaylistForm


def index(request):
    """
    Функция которая показывает html разметку
    :param request: http запрос
    :return: зарендеренная разметка
    """
    if request.method == "POST":
        form = SongForm(request.POST, request.FILES)
        if form.is_valid():
            add_song(request)

    if request.method == "POST":
        form = PlaylistForm(request.POST)
        if form.is_valid():
            create_playlist(form)

    if request.method == "POST":
        form = DeleteSongForm(request.POST)
        if form.is_valid():
            ls_data = form.cleaned_data
            delete_song(ls_data)

    if request.method == "POST":
        form = DeletePlaylistForm(request.POST)
        if form.is_valid():
            delete_playlists(form)

    if request.method == "POST":
        form = SwapQueuePlaylistForm(request.POST)
        if form.is_valid():
            swap_queue(form)

    if request.method == "POST":
        form = RedactionPlaylistForm(request.POST)
        if form.is_valid():
            redact_playlist(form)

    form_song = SongForm
    form_playlist = PlaylistForm
    form_delete_song = DeleteSongForm
    form_delete_playlist = DeletePlaylistForm
    form_swap_playlist_song = SwapQueuePlaylistForm
    form_redaction_playlist = RedactionPlaylistForm

    data_songs = Song.objects.all()
    data_playlists = Playlist.objects.all()

    data = {
        'form_song': form_song,
        'form_playlist': form_playlist,
        'form_delete_song': form_delete_song,
        'form_delete_playlist': form_delete_playlist,
        'form_swap_playlist_song': form_swap_playlist_song,
        'form_redaction_playlist': form_redaction_playlist,
        'data_songs': data_songs,
        'data_playlists': data_playlists,
    }
    return render(request, 'index.html', data)


def redact_playlist(form):
    """
    Функция для редактирования плейлиста
    :param form: заполненная форма
    :return: None
    """
    data = form.cleaned_data
    if data['delete_or_append'] == 1:
        add_songs_in_playlist(data)
    else:
        delete_songs_into_playlist(data)


def delete_songs_into_playlist(data):
    """
    Функция для удаления песен из плейлиста
    :param data: данные о плейлисте и песнях
    :return: None
    """
    playlist = Playlist.objects.get(id=data['redacted_playlist'])
    songs = data['moved_songs']
    playlist_queue = playlist.queue['queue']
    for i in songs:
        playlist_queue.remove(i)
    playlist.queue['queue'] = playlist_queue
    playlist.save()


def add_songs_in_playlist(data):
    """
    Функция добавления песен в плейлист
    :param data: данные о плейлисте и песнях
    :return: None
    """
    playlist = Playlist.objects.get(id=data['redacted_playlist'])
    songs = data['moved_songs']
    playlist_queue = playlist.queue['queue']
    for i in songs:
        playlist_queue.append(i)
    playlist.queue['queue'] = playlist_queue
    playlist.save()


def swap_queue(form):
    """
    Функция для смены очереди
    :param form: заполненная форма
    :return: None
    """
    data = form.cleaned_data
    playlist = Playlist.objects.get(id=data['swap_playlist_queue'])
    songs_id = data['swap_songs_id']
    queue_playlist = list(playlist.queue['queue'])
    index_fst = queue_playlist.index(songs_id[0])
    index_snd = queue_playlist.index(songs_id[1])
    queue_playlist[index_fst], queue_playlist[index_snd] = queue_playlist[index_snd], queue_playlist[index_fst]
    playlist.queue['queue'] = queue_playlist
    playlist.save()


def delete_playlists(form):
    """
    Функция для удаления плейлиста
    :param form: заполненная форма
    :return: None
    """
    data = form.cleaned_data
    for i in data['playlists_id']:
        Playlist.objects.get(id=i).delete()


def create_playlist(form):
    """
    Функция для создания плейлиста
    :param form: заполненная форма
    :return: None
    """
    data = form.cleaned_data
    playlist = Playlist()
    playlist.name = data['name']
    playlist.save()
    for i in data['playlist_songs_id']:
        song = Song.objects.get(id=i)
        song.playlists.add(playlist)
    playlist.queue['queue'] = data['playlist_songs_id']
    playlist.save()


def add_song(request):
    """
    Функция для добавления песни
    :param request: http запрос с заполненной формой
    :return: None
    """
    song = Song()
    song.song_name = request.POST.get('song_name')
    song.artist = request.POST.get('artist')
    song.audio_file = request.FILES.get('audio_file')
    song.save()
    song.playlists.add(Playlist.objects.get(id=1))
    initial_playlist = Playlist.objects.get(id=1)
    queue = list(initial_playlist.queue['queue'])
    queue.append(song.pk)
    initial_playlist.queue['queue'] = queue
    initial_playlist.save()


def delete_song(ls_data):
    """
    Функция для удаления песни
    :param ls_data: объект с данными
    :return: None
    """
    delete_songs_id = ls_data['songs_id']
    for i in delete_songs_id:
        song = Song.objects.get(id=i)
        playlists = song.playlists.all()
        for j in playlists:
            queue = list(j.queue["queue"])
            queue.remove(i)
            j.queue["queue"] = queue
            j.save()
        song.delete()

