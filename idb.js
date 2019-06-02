// Based on the MDN example
// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
// vendor prefixes hahaaa, dalsi body
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"};
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}

const DB_NAME = 'playlistDB0003';
const DB_VERSION = 3;
const DB_STORE_NAME = 'playlists';

var db;

function openDb() {
    var req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onsuccess = function (evt) {
        db = this.result;
        console.log("openDb DONE");
        // test getPlaylistSongAndDisplayInCustomPlaylist();
        loadAllPlaylists();
    };
    req.onerror = function (evt) {
        console.log("F*CK THIS SH*T IM OUT");
    };
    req.onupgradeneeded = function (evt) {
        console.log("openDb.onupgradeneeded");
        var store = evt.currentTarget.result.createObjectStore(
          DB_STORE_NAME);
  
        //store.createIndex('title', 'title', { unique: true });
    };
}

function getObjectStore(store_name, mode) {
    var tx = db.transaction(store_name, mode);
    return tx.objectStore(store_name);
}

function clearObjectStore() {
    var store = getObjectStore(DB_STORE_NAME, 'readwrite');
    var req = store.clear();
    req.onsuccess = function(evt) {
      console.log("ObjectStore cleared!")
    };
    req.onerror = function (evt) {
      console.error("clearObjectStore:", evt.target.errorCode);
      displayActionFailure(this.error);
    };
}

// Saves a playlist to IDB
// The playlist has(?) to be chanded to simple object
// {title, list of audio files}
function addPlaylist(playlist) {
    let audioFiles = playlist.tracks.map(t => t.file);
    let plObj = {title: playlist.title, files: audioFiles};
    var store = getObjectStore(DB_STORE_NAME, 'readwrite');
    var req;
    try{
        req = store.put(plObj, playlist.title);
    } catch (e) {
        if (e.name == 'DataCloneError')
            console.log("PROBLEM WITH CHROME");
        throw e;
    }
    req.onsuccess = function (evt) {
        console.log("Playlist added to db");
    }
    req.onerror = function() {
        console.log("Task of adding playlist to db failed successfuly");
    }
}

function loadAllPlaylists() {
    var store = getObjectStore(DB_STORE_NAME, 'readwrite');
    var req = store.getAll();
    req.onsuccess = function(evt) {
        var retrievedData = evt.target.result;
        console.log("Retrieved: ");
        retrievedData.forEach(playlist => 
            {
                var pl = new CustomPlaylist(playlist.title);
                playlist.files.forEach(file => {
                    pl.loadSong(file);
                })
                playlists.push(pl);
            });
        
    }
}

// test function to see if it can handle audio blobs
function addPlaylistSong(blob) {
    var store = getObjectStore(DB_STORE_NAME, 'readwrite');
    var req;
    try{
        req = store.put(blob, "song");
    } catch (e) {
        if (e.name == 'DataCloneError')
            console.log("PROBLEM WITH CHROME");
        throw e;
    }
    req.onsuccess = function (evt) {
        console.log("SONG ADDED TO DB");
    }
    req.onerror = function() {
        console.log("F*CK THE DB!! I HATE MY LIFE");
    }
}

// test function 2
function getPlaylistSongAndDisplayInCustomPlaylist() {
    var store = getObjectStore(DB_STORE_NAME, 'readwrite');
    var req = store.get("song");
    req.onsuccess = function(evt) {
        var song = evt.target.result;
        console.log("Song retrieved: " + song);
        p2.addSong(song);
    }
}

function removePlaylist(title) {
    var store = getObjectStore(DB_STORE_NAME, 'readwrite');
    var req = store.delete(title);
    req.onsuccess = function(evt) {
        console.log("Playlist removed successfuly");
    }
}

openDb();

