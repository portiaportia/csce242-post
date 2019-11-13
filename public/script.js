async function showSongs(){
    let songsJson = await fetch('api/songs');
    let songs = await songsJson.json();
    let songsDiv = document.getElementById("songs");
    songsDiv.innerHTML = "";

    for(i in songs){
        songsDiv.append(getSongElem(songs[i]));
    }
}

async function showSong(){
    let id = document.getElementById("txt-song-id").value;
    let response = await fetch(`api/songs/${id}`);
    let song = await response.json();

    let songDiv = document.getElementById("song");
    songDiv.append(getSongElem(song));
}

function getSongElem(song){
    let songDiv = document.createElement("div");
    songDiv.classList.add("song");
    let songTitle = document.createElement("h3");
    songTitle.innerHTML = song.id + ": " + song.name;

    let songP = document.createElement("p");
    songP.innerHTML = `by ${song.singer}, genre ${song.genre}`;

    songDiv.append(songTitle);
    songDiv.append(songP);
    
    return songDiv;
}

async function addSong(){
    //get the song inforamtion
    const songName = document.getElementById("txt-new-song-name").value;
    const songSinger = document.getElementById("txt-new-song-singer").value;
    const songGenre = document.getElementById("txt-new-song-genre").value;

    console.log(`you are adding ${songName}, ${songSinger}, ${songGenre}`);

    let song = {"name": songName, "singer":songSinger, "genre":songGenre};

    let response = await fetch('/api/songs/', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(song),
    });

    if(respose != 200){
        console.log("Error adding song");
        return;
    }

    let result = await response.json();
    showSongs();
}

window.onload = function(){
    this.showSongs();
    let showSongButton = document.getElementById("btn-show-song");
    showSongButton.onclick = showSong;

    let addSongButton = document.getElementById("btn-add-song");
    addSongButton.onclick = addSong;
}