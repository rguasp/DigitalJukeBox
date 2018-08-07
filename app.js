// On Page Load
$(document).ready(function(){  
  function getTrackList(albumId){    
          axios({
            method:"GET",
            url: `https://stg-resque.hakuapp.com/songs.json?album_id=${albumId}`
          })
              .then(trackListWeGetBackFromApi => {
                $('#tracklist').empty();
                for(i=0; i < trackListWeGetBackFromApi.data.length; i++) {
                  // sort function for tracklist
                  trackListWeGetBackFromApi.data.sort(function(a,b) {return a.song_order-b.song_order})
                  // appending tracklist to html with jquery
                   if(trackListWeGetBackFromApi.data[i].song_label == (null||undefined)){
                    $('#tracklist').append(`
                    <li class="list-group-item clearfix">
                    <span class="badge" id="badge-custom">${trackListWeGetBackFromApi.data[i].song_duration}</span>
                    <div class="col-sm-2 set-padding-0>
                    <div class="col-sm-1 text-center>
                    
                    <i class="heart fa fa-heart-o"></i>
                    
                    <span id="tnum">${trackListWeGetBackFromApi.data[i].song_order}</span>
                    </div>
                    
	                  
                    </div>
                    </div>
                    <div class="col-sm-9 set-padding-0">
                    <span id="songname"> ${trackListWeGetBackFromApi.data[i].song_name}</span>
                    </div>
                    </li>
                    `)
                   }else if (trackListWeGetBackFromApi.data[i].song_label.length === 0){
                    $('#tracklist').append(`
                    <li class="list-group-item clearfix">
                    <span class="badge" id="badge-custom">${trackListWeGetBackFromApi.data[i].song_duration}</span>
                    <div class="col-sm-2 set-padding-0>
                    <div class="col-sm-1 text-center>
                    
                    <i class="heart fa fa-heart-o"></i>
                    
                    <span id="tnum">${trackListWeGetBackFromApi.data[i].song_order}</span>
                    </div>
                    
	                  
                    </div>
                    </div>
                    <div class="col-sm-9 set-padding-0">
                    <span id="songname"> ${trackListWeGetBackFromApi.data[i].song_name}</span>
                    </div>
                    </li>
                    `)
                   }else if(trackListWeGetBackFromApi.data[i].song_label.length === 1){
                    $('#tracklist').append(`
                    <li class="list-group-item clearfix">
                    <span class="badge" id="badge-custom">${trackListWeGetBackFromApi.data[i].song_duration}</span>
                    <div class="col-sm-2 set-padding-0>
                    <div class="col-sm-1 text-center>
                    
                    <i class="heart fa fa-heart-o"></i>
                    
                    <span id="tnum">${trackListWeGetBackFromApi.data[i].song_order}</span>
                    </div>
                    
                    </div>
                    </div>
                    <div class="col-sm-9 set-padding-0">
                    <span id="songname"> ${trackListWeGetBackFromApi.data[i].song_name}</span>
                    <span class="songlabel">${trackListWeGetBackFromApi.data[i].song_label[0]}</span>
                    </div>
                    </li>
                    `)
                   }else if(trackListWeGetBackFromApi.data[i].song_label.length === 2)
                   $('#tracklist').append(`
                   <li class="list-group-item clearfix">
                   <span class="badge" id="badge-custom">${trackListWeGetBackFromApi.data[i].song_duration}</span>
                   <div class="col-sm-2 set-padding-0>
                   <div class="col-sm-1 text-center>
                   
                   <i class="heart fa fa-heart-o"></i>
                   
                   <span id="tnum">${trackListWeGetBackFromApi.data[i].song_order}</span>
                   </div>
                   
                   </div>
                   </div>
                   <div class="col-sm-9 set-padding-0">
                   <span id="songname"> ${trackListWeGetBackFromApi.data[i].song_name}</span>
                   <span class="songlabel">${trackListWeGetBackFromApi.data[i].song_label[0]}</span>
                   <span class="songlabel">${trackListWeGetBackFromApi.data[i].song_label[1]}</span>
                   </div>
                   </li>
                   `)
                  }
              })
  }
  // axios call to access api for albums
  axios({
    method: "GET",
    url: `https://stg-resque.hakuapp.com/albums.json`
  })
  // after axios call then following code executed
  .then(albumsWeGetBackFromApi => {
    // on slide event listener
    $("#myCarousel").on('slide.bs.carousel', function(evt) {
      console.log($(evt.relatedTarget).index());
      // I get the index of the active slide
      let i = $(evt.relatedTarget).index();
      // I get the id of the album in the slide
      let albumId = albumsWeGetBackFromApi.data[i].id;
      getTrackList(albumId);
        })
    for(i=0; i < albumsWeGetBackFromApi.data.length; i++) {
      let slideNumber = i;
      // if/else statement for auto active selection on pageload
      if(i === 0){
        // appends albums to carousel with jquery
        $('.carousel-inner').append(`
          <div class="active item" data-slide-number="${slideNumber}" style="font-family: 'Roboto', sans-serif;">
            <img src="${albumsWeGetBackFromApi.data[i].cover_photo_url}" alt="AlbumCover">
            <p>${albumsWeGetBackFromApi.data[i].name}</p>
            <p>${albumsWeGetBackFromApi.data[i].artist_name}</p>
          </div>
        `)
        getTrackList(albumsWeGetBackFromApi.data[i].id);
      }else{
       $('.carousel-inner').append(`
          <div class="item" data-slide-number="${slideNumber}" style="font-family: 'Roboto', sans-serif;">
            <img src="${albumsWeGetBackFromApi.data[i].cover_photo_url}" alt="AlbumCover">
            <p>${albumsWeGetBackFromApi.data[i].name}</p>
            <p>${albumsWeGetBackFromApi.data[i].artist_name}</p>
          </div>
        `)
      }
      // appends albums to carousel selector
      $('#carousel-selector-' + slideNumber).append(`
        <img src="${albumsWeGetBackFromApi.data[i].cover_photo_url}" alt="AlbumCover">
      `)
    }
  })
  // if there is an error it will be console logged
  .catch(err => {
    console.log(err);
  })

  
  // Handles carousel switching interval
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
// heart toggle on click
$(document).on('click', '.heart.fa', function() {
  $(this).toggleClass("fa-heart fa-heart-o");
});

    
}); // end document ready
  