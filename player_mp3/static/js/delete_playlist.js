function delete_playlist() {
    const listForPlaylistsId = document.querySelector("#id_playlists_id");
    const listPlaylists = document.querySelectorAll("[data-playlist-id]");

    let listPlaylistsForDelete = [];

    function refreshListPlaylistsForDelete() {
        listForPlaylistsId.textContent = `[${listPlaylistsForDelete}]`
    }


    listPlaylists.forEach(function (item) {
        item.addEventListener("click", function () {
            if (item.classList.contains("active")) {
                item.classList.remove("active");
                listPlaylistsForDelete = listPlaylistsForDelete.filter(val => val !== item.dataset.playlistId);
            } else {
                item.classList.add("active");
                listPlaylistsForDelete.push(item.dataset.playlistId);
            }
            refreshListPlaylistsForDelete();
        })
    })
}

delete_playlist();