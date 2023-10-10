function delete_song() {
    const listForSongId = document.querySelector("#id_songs_id");
    const songsList = document.querySelectorAll("[data-song-id]");

    let actualSongId = []

    function freshListForSongId() {
        listForSongId.textContent = `[${actualSongId}]`
    }

    songsList.forEach(function (item) {
        item.addEventListener("click", function () {
            if (item.classList.contains("active")) {
                item.classList.remove("active");
                actualSongId = actualSongId.filter(val => val !== item.dataset.songId);
            } else {
                item.classList.add("active");
                actualSongId.push(item.dataset.songId);
            }
            freshListForSongId()
        })
    })
}

delete_song();
