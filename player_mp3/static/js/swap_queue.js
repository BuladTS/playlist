function swap_queue() {
    const inputWithIdSwapsPlaylist = document.querySelector('#id_swap_playlist_queue');
    const allPotentialSwapPlaylists = document.querySelectorAll('[data-swap-playlist-id]');

    const inputWithIdSwappedSongs = document.querySelector('#id_swap_songs_id');
    const allSongsByPlaylist = document.querySelectorAll('[data-swap-queue-id]');


    allPotentialSwapPlaylists.forEach(function (item) {
        item.addEventListener("click", function () {
            inputWithIdSwapsPlaylist.setAttribute("value", item.dataset.swapPlaylistId);
        })
    })


    let firstSong = null;
    let secondSong = null;
    allSongsByPlaylist.forEach(function (item) {
        item.addEventListener("click", function () {
            if (firstSong === null) {
                firstSong = item;
                firstSong.classList.add("active");
            } else if (secondSong === null) {
                secondSong = item;
                secondSong.classList.add("active");
                updateInput()
            } else {
                firstSong.classList.remove("active");
                firstSong = secondSong;
                secondSong = item;
                secondSong.classList.add("active");
                updateInput()
            }
        })
    })

    function updateInput() {
        inputWithIdSwappedSongs.textContent = `[${firstSong.dataset.swapQueueId},${secondSong.dataset.swapQueueId}]`
    }
}

swap_queue();