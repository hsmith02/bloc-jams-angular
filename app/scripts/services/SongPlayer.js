(function() {
    function SongPlayer() {
        var SongPlayer = {};
        
        var currentSong = null;
        
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
                currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentSong = song;
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
        
        /**
        * @function SongPlayer.play
        * @desc if a song other than the current song or a paused song is clicked, play the clicked song
        * @param {object} song
        */
        
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                playSong(song);
                
            } else if (currentSong === song) {
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
            currentBuzzObject.pause();
            song.Playing = false;
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer)
})();