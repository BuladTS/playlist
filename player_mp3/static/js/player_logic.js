const playlists = document.querySelectorAll('[data-queue]');
const songs = document.querySelectorAll("[data-playlist-id-queue]");
const audioTracks = document.querySelectorAll('[data-audio-track]');

const stopButton = document.querySelector('[data-stop-button]');
const previousButton = document.querySelector('[data-previous-button]');
const nextButton = document.querySelector('[data-next-button]');
const titleArtistSong = document.querySelector('[data-artist-song]');
const showTime = document.querySelector('[data-show-time]');

const clickEvent = new MouseEvent("click", {
    "view": window,
    "bubbles": true,
    "cancelable": false
});

let playlistQueue = {};
playlists.forEach(function (item) {
    let queue = []
    audioTracks.forEach(function (track) {
        if (item.dataset.queue.indexOf(track.dataset.audioTrack) !== - 1 ) {
             queue.push(track.dataset.audioTrack);
        }
    })
    playlistQueue[`${item.dataset.idPlaylist}`] = queue
})

let isTrackWithAudio = {};

audioTracks.forEach(function (item) {
    isTrackWithAudio[item.dataset.audioTrack] = item;
    item.addEventListener("ended", function () {
        nextButton.dispatchEvent(clickEvent);
    })
})

let playingPlaylist = {
    "id_playlist": 1,
    "queue": playlists[0].dataset.queue,
    "nowPlayingSongId": playlistQueue["1"][0],
    "indexPlayingSong": 0
};

stopButton.addEventListener("click", function() {
    let track = isTrackWithAudio[playingPlaylist["nowPlayingSongId"]];
    if (stopButton.textContent === "Старт") {
        stopButton.textContent = "Пауза";
        track.play();
    } else {
        track.pause();
        stopButton.textContent = "Старт";
    }
});

function fixTime(time) {
    let seconds = time % 60;
    let foo = time - seconds;
    let minutes = foo / 60;
    if(seconds < 10){
        seconds = "0" + seconds.toString();
    }
    minutes = Math.round(minutes);
    seconds = Math.round(seconds);
    return minutes + ":" + seconds;
}

function updateAuthorSong() {
    let track = isTrackWithAudio[playingPlaylist["nowPlayingSongId"]];
    titleArtistSong.textContent = track.dataset.songName;
}

function showTrackTime() {
    let track = isTrackWithAudio[playingPlaylist["nowPlayingSongId"]]
    let fullTime = track.duration;
    showTime.textContent = `${fixTime(track.currentTime)}/${fixTime(fullTime)}`;
}

function addListener() {
    let track = isTrackWithAudio[playingPlaylist["nowPlayingSongId"]]
    track.addEventListener("timeupdate", showTrackTime);
}

nextButton.addEventListener("click", function () {
    let track = isTrackWithAudio[playingPlaylist["nowPlayingSongId"]];
    track.pause();
    track.currentTime = 0;
    track.removeEventListener("update", showTrackTime);
    if (playingPlaylist["indexPlayingSong"] + 1 === playlistQueue[playingPlaylist["id_playlist"]].length) {
        playingPlaylist["indexPlayingSong"] = 0;
        playingPlaylist["nowPlayingSongId"] = playlistQueue[playingPlaylist["id_playlist"]][0];
        track = isTrackWithAudio[playingPlaylist["nowPlayingSongId"]];
        addListener();
        track.play();
    } else {
        playingPlaylist["indexPlayingSong"] += 1;
        playingPlaylist["nowPlayingSongId"] = playlistQueue[playingPlaylist["id_playlist"]][playingPlaylist["indexPlayingSong"]];
        track = isTrackWithAudio[playingPlaylist["nowPlayingSongId"]];
        addListener();
        track.play();
    }
    updateAuthorSong()
    highlightButton();
})

previousButton.addEventListener("click", function() {
    let track = isTrackWithAudio[playingPlaylist["nowPlayingSongId"]];
    track.pause();
    track.currentTime = 0;
    track.removeEventListener("update", showTrackTime);
    if (playingPlaylist["indexPlayingSong"] === 0) {
        playingPlaylist["indexPlayingSong"] = playlistQueue[playingPlaylist["id_playlist"]].length - 1;
        playingPlaylist["nowPlayingSongId"] = playlistQueue[playingPlaylist["id_playlist"]][playingPlaylist["indexPlayingSong"]];
        track = isTrackWithAudio[playingPlaylist["nowPlayingSongId"]];
        addListener()
        track.play();
    } else {
        playingPlaylist["indexPlayingSong"] -= 1;
        playingPlaylist["nowPlayingSongId"] = playlistQueue[playingPlaylist["id_playlist"]][playingPlaylist["indexPlayingSong"]];
        track = isTrackWithAudio[playingPlaylist["nowPlayingSongId"]];
        addListener()
        track.play();
    }
    highlightButton();
    updateAuthorSong();
})

function updatePauseButton() {
    stopButton.textContent = "Старт";
}

function extinguishButton() {
    songs.forEach(function (item) {
        item.classList.remove("active");
    })
}

function highlightButton() {
    extinguishButton();
    songs.forEach(function (item) {
        if (item.dataset.playlistIdQueue.toString() === playingPlaylist["id_playlist"].toString()) {
            if (playingPlaylist["nowPlayingSongId"].toString() === item.dataset.id_song.toString()) {
                item.classList.add("active");
            }
        }
    })
}

songs.forEach(function (item) {
    item.addEventListener("click", function () {
        let track = isTrackWithAudio[playingPlaylist["nowPlayingSongId"]];
        track.pause();
        track.currentTime = 0;
        let playlist_id = item.dataset.playlistIdQueue;
        let song_id = item.dataset.id_song
        playingPlaylist["id_playlist"] = playlist_id;
        playingPlaylist["indexPlayingSong"] = playlistQueue[playlist_id].indexOf(song_id);
        playingPlaylist["nowPlayingSongId"] = song_id;
        playingPlaylist["queue"] = playlistQueue[playlist_id];
        updateAuthorSong();
        addListener();
        updatePauseButton();
        highlightButton();
    })
})

addListener();
updateAuthorSong();
highlightButton()
