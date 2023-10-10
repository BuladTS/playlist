function redactionPlaylist () {
    const disabledButtons = document.querySelectorAll('[disabled]');

    const fieldWithIdPlaylist = document.querySelector('#id_redacted_playlist');
    const deleteOrAppendField = document.querySelector('#id_delete_or_append');


    const playlistList = document.querySelectorAll('[data-redacted-playlist-id]');

    function disActive() {
        playlistList.forEach(function (item) {
            item.classList.remove("active");
        })
    }

    playlistList.forEach(function (item) {
        item.addEventListener("click", function () {
            fieldWithIdPlaylist.setAttribute("value", item.dataset.redactedPlaylistId);
            disabledButtons[0].disabled = false;
            disabledButtons[0].setAttribute("data-modal-button", `modal-del-${item.dataset.redactedPlaylistId}`);
            disabledButtons[1].disabled = false;
            disabledButtons[1].setAttribute("data-modal-button", `modal-add-${item.dataset.redactedPlaylistId}`);
            disActive();
            item.classList.add("active");
        })
    })

    disabledButtons[0].addEventListener("click", function (){
        deleteOrAppendField.setAttribute("value", "-1");
        actualSongsIdList = [];
        refreshActualSongsIdList();
    })

    disabledButtons[1].addEventListener("click", function () {
        deleteOrAppendField.setAttribute("value", "1");
        actualSongsIdList = [];
        refreshActualSongsIdList();
    })


    const movedSongsField = document.querySelector('#id_moved_songs');
    const addAndDelButton = document.querySelectorAll("[data-del-add-song]");

    let  actualSongsIdList = [];

    function refreshActualSongsIdList() {
        movedSongsField.textContent = `[${actualSongsIdList}]`;
    }

    addAndDelButton.forEach(function (item) {
        item.addEventListener("click", function () {
             if (item.classList.contains("active")) {
                 item.classList.remove("active");
                 actualSongsIdList = actualSongsIdList.filter(val => val !== item.dataset.delAddSong);
             } else {
                 item.classList.add("active");
                 actualSongsIdList.push(item.dataset.delAddSong);
             }
             refreshActualSongsIdList()
        })
    })
}

redactionPlaylist()
