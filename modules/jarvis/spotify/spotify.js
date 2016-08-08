var audio = new Audio();

function searchTracks(query) {
  $.ajax({
    url: 'https://api.spotify.com/v1/search',
    data: {
        q: query,
        type: 'track'
    },
    success: function (response) {
      if (response.tracks.items.length) {
        var track = response.tracks.items[0];
        audio.src = track.preview_url;
        audio.play();
      }
    }
  });
}

function playSong(songName, artistName) {
  var query = songName;
  if (artistName) {
    query += ' artist:' + artistName;
  }

  searchTracks(query);
}
