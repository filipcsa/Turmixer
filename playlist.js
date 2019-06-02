 /** Class for representing a song in the playlist */
 class Song {
     constructor(src, title, interpret, imgsrc, file) {
        this.src = src;
        this.title = title;
        this.artist = interpret;
        this.imgsrc = imgsrc;

        // for saving to idb
        this.file = file
     }

     getSongDiv() {
         // create elements for img, title and artist
         let songDiv = document.createElement('div');
         songDiv.classList.add('song');
         let albumImg = document.createElement('img');
         albumImg.src = this.imgsrc;
         let title = document.createElement('h6');
         title.innerText = this.title;
         let artist = document.createElement('h6');
         artist.innerText = this.artist;

         // insert the into the div
         songDiv.appendChild(albumImg);
         songDiv.appendChild(title);
         songDiv.appendChild(artist);

         return songDiv;
     }
 }
        
 /** A class to represent an immutable playlist of songs
  * this playlist will be programatically defined in turmix.html
  * On the other hand the mutable playlist can be created by the user */ 
class Playlist {
    constructor(title) {
        this.title = title;
        this.tracks = [];
        this.selectedTrack = null;
        this.type = "immutable";

        // create list item, add event listener and add to DOM
        this.li = document.createElement('li');
        this.li.innerText = title;
        this.li.addEventListener('click', this.onPlaylistClicked.bind(this), false);
        let playlistsUL = document.querySelector('.playlists');
        playlistsUL.appendChild(this.li);
        console.log(playlistsUL);
    }
    
    // when this playlist is clicked
    onPlaylistClicked() {
        if (selectedPlaylist != null) {
            selectedPlaylist.li.classList.remove('selected');
        }    
        this.li.classList.add('selected');
        selectedPlaylist = this;
        console.log(`${this.title} clicked!`);
        this.displayPlaylist();
    }

    // displays the whole playlist
    displayPlaylist() {
        console.log("Displaying playlist " + this.title);
        console.log("Consisting of tracks " + this.tracks);
        selectedPlaylistDiv.innerHTML = "";
        this.tracks.forEach(this.displaySong.bind(this));
    }

    // displays the song and adds event listener to it
    displaySong(song) {
       let songDiv = song.getSongDiv();
       console.log(songDiv);
       songDiv.songSrc = song.src;
       console.log(songDiv);
       songDiv.addEventListener('click', this.onSongClicked.bind(null, event, song));
       selectedPlaylistDiv.appendChild(songDiv);
       

    }

    // plays the song, has to toggle the play button
    onSongClicked(event, song) {
        audio.src = song.src;
        audio.play();
        playToggle.classList = "";
        playToggle.classList.add('play');
        console.log(playToggle);
        console.log("Track clicked"); 
        let currS = document.querySelector(".currentSong");
        currS.innerText = "";
        currS.innerText = song.title;
    }

    // method to add tracks, can add track song or array of tracks
    addSong(song) {
        if (Array.isArray(song)) {
            this.tracks = this.tracks.concat(song);
        }
        else { 
            this.tracks.push(song);
        }
    }
}


class CustomPlaylist extends Playlist {
    constructor(title) {
        super(title);
        this.type = "custom";
        this.tracks = [];
    }

    /** Add song by Dn'D, get metadata w/ the getMetadata func */
    addSong(file) {
        console.log("Called addSong on CustomPlaylist");
        this.getMetadata(file, this);
    }

    /** Loads song from IDB, get metadata w/ loadMetadata func 
     * works basically the same as addSong, but doesn't display
     * but doesn't display the playlist immediately
    */
    loadSong(file) {
        console.log(`Called loadSong on ${this.title}`);
        this.loadMetadata(file, this);
    }

    /** Adding song to selected playlist manually by Dn'D */
    getMetadata(data) {
        let song = new Song('','','','', data);
        musicmetadata(data, function(err, result) {
            if (err) throw err;
            if (result.picture.length > 0) {
                var picture = result.picture[0];
                var url = URL.createObjectURL(new Blob([picture.data],
                     {'type': 'image/' + picture.format}));
                song.imgsrc = url;     
            }
            song.title = result.title;
            song.artist = result.artist;
            song.src = URL.createObjectURL(data);
            console.log(result.artist);
            selectedPlaylist.tracks.push(song);
            selectedPlaylist.displayPlaylist();

            // add to idb
            addPlaylist(selectedPlaylist);
        });
    }

    /** Same, but different */
    loadMetadata(data, pl) {
        var currPlaylist = this;
        let song = new Song('', '', '', '', data);
        musicmetadata(data, function(err, result) {
            if (err) throw err;
            if (result.picture.length > 0) {
                var picture = result.picture[0];
                var url = URL.createObjectURL(new Blob([picture.data],
                     {'type': 'image/' + picture.format}));
                song.imgsrc = url;     
            }
            song.title = result.title;
            song.artist = result.artist;
            song.src = URL.createObjectURL(data);

            pl.tracks.push(song);
        });
    }

}