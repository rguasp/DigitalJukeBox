$(document).ready(function(){   
    axios({
      method: "GET",
      url: `https://stg-resque.hakuapp.com/albums.json`
    })
    .then(albumsWeGetBackFromApi => {
      console.log(albumsWeGetBackFromApi.data)
    for(i=0; i < albumsWeGetBackFromApi.data.length; i++) {
      $('.albums').append(`
        <h4>${albumsWeGetBackFromApi.data[i].id}<h4>
        <img src="${albumsWeGetBackFromApi.data[i].cover_photo_url}" alt="AlbumCover">
        <h3>${albumsWeGetBackFromApi.data[i].name}</h3>
        <h4>${albumsWeGetBackFromApi.data[i].artist_name}<h4>
        `)
    }
    })
    .catch(err => {
      console.log(err);
    })
    for(i=1; i < 6; i++){
      let albumId = i;
    axios({
      method:"GET",
      url: `https://stg-resque.hakuapp.com/songs.json?album_id=${albumId}`
    })
    .then(trackListWeGetBackFromApi => {
      console.log(trackListWeGetBackFromApi.data)
      for(i=0; i < trackListWeGetBackFromApi.data.length; i++) {
        trackListWeGetBackFromApi.data.sort(function(a,b) {return a.song_order-b.song_order})
      $('.tracklist').append(`
      <h3> ${trackListWeGetBackFromApi.data[i].song_name}</h3>
      <h4>  ${trackListWeGetBackFromApi.data[i].song_order}</h4>
      <h4> ${trackListWeGetBackFromApi.data[i].song_label}</h4>
      <h4> ${trackListWeGetBackFromApi.data[i].song_duration}</h4>
      `)
      }
    })
    .catch(err => {
        console.log(err);
      })
    }

    $('#myCarousel').carousel({
      interval: 5000
});

$('#carousel-text').html($('#slide-content-0').html());

//Handles the carousel thumbnails
$('[id^=carousel-selector-]').click( function(){
      var id_selector = $(this).attr("id");
      var id = id_selector.substr(id_selector.length -1);
      var id = parseInt(id);
      $('#myCarousel').carousel(id);
});


// When the carousel slides, auto update the text
$('#myCarousel').on('slid', function (e) {
      var id = $('.item.active').data('slide-number');
      $('#carousel-text').html($('#slide-content-'+id).html());
});


    
    
  }); // end document ready
  