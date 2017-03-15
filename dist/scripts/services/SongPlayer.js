(function() {
    function SongPlayer() {
        var SongPlayer = {};
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        
        var currentBuzzObject = null;
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            SongPlayer.currentSong = song;
        };
        
        /**
        * @function playSong
        * @desc plays currentBuzzObject
        * @param {object} song
        */
        
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        
        SongPlayer.currentSong = null;
        
        /**
        * @function SongPlayer.play
        * @desc if a song other than the current song or a paused song is clicked, play the clicked song
        * @param {object} song
        */
        
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
                
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                }
            } 
        };
        
        /**
        * @function SongPlayer.pause
        * @desc if pause button is clicked, pause the song
        * @param {object} song
        */
        
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.Playing = false;
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer)
})();