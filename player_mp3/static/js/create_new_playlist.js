function create_new_playlist() {
    const playlistSongsId = document.querySelector("#id_playlist_songs_id");
    const potentialPlaylistSongs = document.querySelectorAll("[data-playlist-song-id]");

    let playlistSongsListId = [];

    function refreshPlaylistSongsId() {
        playlistSongsId.textContent = `[${playlistSongsListId}]`
    }

    potentialPlaylistSongs.forEach(function (item) {
        item.addEventListener("click", function () {
            if (item.classList.contains("active")) {
                item.classList.remove("active");
                playlistSongsListId = playlistSongsListId.filter(val => val !== item.dataset.playlistSongId);
            } else {
                item.classList.add("active");
                playlistSongsListId.push(item.dataset.playlistSongId);
            }
            refreshPlaylistSongsId()
        })
    })
}

create_new_playlist();