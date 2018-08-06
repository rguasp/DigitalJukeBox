$(document).ready(function(){   
    axios({
      method: "GET",
      url: `https://stg-resque.hakuapp.com/albums.json`
     })
    .then(albumsWeGetBackFromApi => {
      console.log(albumsWeGetBackFromApi.data)

    
    for(i=0; i < albumsWeGetBackFromApi.data.length; i++) {
      let albumNumber = i;
      if(i === 0){
        $('.carousel-inner').append(`
        <div class="active item" data-slide-number="${albumNumber}">
        <img src="${albumsWeGetBackFromApi.data[i].cover_photo_url}" alt="AlbumCover">
        <p>${albumsWeGetBackFromApi.data[i].name}</p>
        <p>${albumsWeGetBackFromApi.data[i].artist_name}</p>
        </div>
         `)
      }else{
       $('.carousel-inner').append(`
        <div class="item" data-slide-number="${albumNumber}">
        <img src="${albumsWeGetBackFromApi.data[i].cover_photo_url}" alt="AlbumCover">
        <p>${albumsWeGetBackFromApi.data[i].name}</p>
        <p>${albumsWeGetBackFromApi.data[i].artist_name}</p>
        </div>
        `)
      }
      $('#carousel-selector-' + albumNumber).append(`
      <img src="${albumsWeGetBackFromApi.data[i].cover_photo_url}" alt="AlbumCover">
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
      interval: false
});

$('#carousel-text').html($('#slide-content-0').html());

//Handles the carousel thumbnails
$('[id^=carousel-selector-]').click( function(){
  var id = this.id.substr(this.id.lastIndexOf("-") + 1);
  var id = parseInt(id);
  $('#myCarousel').carousel(id);
});


// When the carousel slides, auto update the text
$('#myCarousel').on('slid.bs.carousel', function (e) {
       var id = $('.item.active').data('slide-number');
      $('#carousel-text').html($('#slide-content-'+id).html());
});

    
    
  }); // end document ready
  