// On Page Load
$(document).ready(function(){  
  // tracklist function includes api call and tracklist appending
  function getTrackList(albumId){    
    $.ajax({
      type:"GET",
      url: `https://stg-resque.hakuapp.com/songs.json?album_id=${albumId}`,
      crossDomain: true,
      dataType: 'jsonp'
    })
    .then(trackListWeGetBackFromApi => {  
      // empty tracklist before new one is appended to erase past track list
      // can use hidden attribute or toggle to save on API requests
      $('#tracklist').empty();
      for(i=0; i < trackListWeGetBackFromApi.length; i++) {
        // sort function for tracklist order
        trackListWeGetBackFromApi.sort(function(a,b) {return a.song_order-b.song_order})
        // appending tracklist to html with jquery
        // also checking if label is null undefined and how many labels there are 
        if(trackListWeGetBackFromApi[i].song_label == (null||undefined)){
          $('#tracklist').append(`
            <li class="list-group-item clearfix">
              <span class="badge" id="badge-custom">${trackListWeGetBackFromApi[i].song_duration}</span>
              <div class="col-sm-2 set-padding-0>
                <div class="col-sm-1 text-center> 
                  <i class="heart fa fa-heart-o"></i>
                  <span id="tnum">${trackListWeGetBackFromApi[i].song_order}</span>
                </div>
              </div>
              <div class="col-sm-9 set-padding-0">
                <span id="songname"> ${trackListWeGetBackFromApi[i].song_name}</span>
              </div>
            </li>
          `)
        } 
        else if (trackListWeGetBackFromApi[i].song_label.length === 0){
          $('#tracklist').append(`
            <li class="list-group-item clearfix">
              <span class="badge" id="badge-custom">${trackListWeGetBackFromApi[i].song_duration}</span>
              <div class="col-sm-2 set-padding-0>
                <div class="col-sm-1 text-center>
                  <i class="heart fa fa-heart-o"></i>
                  <span id="tnum">${trackListWeGetBackFromApi[i].song_order}</span>
                </div>    
              </div>
              <div class="col-sm-9 set-padding-0">
                <span id="songname"> ${trackListWeGetBackFromApi[i].song_name}</span>
              </div>
            </li>
          `)
        }
        else if(trackListWeGetBackFromApi[i].song_label.length === 1){
          $('#tracklist').append(`
            <li class="list-group-item clearfix">
              <span class="badge" id="badge-custom">${trackListWeGetBackFromApi[i].song_duration}</span>
              <div class="col-sm-2 set-padding-0>
                 <div class="col-sm-1 text-center>
                    <i class="heart fa fa-heart-o"></i>
                    <span id="tnum">${trackListWeGetBackFromApi[i].song_order}</span>
                  </div> 
              </div>
              <div class="col-sm-9 set-padding-0">
                <span id="songname"> ${trackListWeGetBackFromApi[i].song_name}</span>
                <span class="songlabel">${trackListWeGetBackFromApi[i].song_label[0]}</span>
              </div>
            </li>
          `)
        }
        else if(trackListWeGetBackFromApi[i].song_label.length === 2){
          $('#tracklist').append(`
            <li class="list-group-item clearfix">
              <span class="badge" id="badge-custom">${trackListWeGetBackFromApi[i].song_duration}</span>
              <div class="col-sm-2 set-padding-0>
                <div class="col-sm-1 text-center>
                  <i class="heart fa fa-heart-o"></i>
                  <span id="tnum">${trackListWeGetBackFromApi[i].song_order}</span>
                </div>
              </div>
              <div class="col-sm-9 set-padding-0">
                <span id="songname"> ${trackListWeGetBackFromApi[i].song_name}</span>
                <span class="songlabel">${trackListWeGetBackFromApi[i].song_label[0]}</span>
                <span class="songlabel">${trackListWeGetBackFromApi[i].song_label[1]}</span>
              </div>
            </li>
          `)
        }
      }
    })
  }
  // axios call to access api for albums
  $.ajax({
    type: "GET",
    url: `https://stg-resque.hakuapp.com/albums.json`,
    crossDomain: true,
    dataType: 'jsonp'
  })
  // after axios call then following code executed with API information
  .then(albumsWeGetBackFromApi => {
    // on slide event listener
    $("#myCarousel").on('slide.bs.carousel', function(evt) {
      // I get the index of the active slide 
      // .evt gets all the HTML thats getting Appended
      // .relatedtarget gets current active slide
      // .index gets the index of said active slide aka its position in carousel
      let i = $(evt.relatedTarget).index();
      // I get the id of the album in the slide
      let albumId = albumsWeGetBackFromApi[i].id;
      getTrackList(albumId);
    })
    for(i=0; i < albumsWeGetBackFromApi.length; i++) {
      let slideNumber = i;
      // if/else statement for auto active selection on pageload
      if(i === 0){
        // appends albums to carousel with jquery
        $('.carousel-inner').append(`
          <div class="active item" data-slide-number="${slideNumber}" style="font-family: 'Roboto', sans-serif;">
            <img src="${albumsWeGetBackFromApi[i].cover_photo_url}" alt="AlbumCover">
            <p>${albumsWeGetBackFromApi[i].name}</p>
            <p>${albumsWeGetBackFromApi[i].artist_name}</p>
          </div>
        `)
        // on page load tracklist
        getTrackList(albumsWeGetBackFromApi[i].id);
      }
      else{
       $('.carousel-inner').append(`
          <div class="item" data-slide-number="${slideNumber}" style="font-family: 'Roboto', sans-serif;">
            <img src="${albumsWeGetBackFromApi[i].cover_photo_url}" alt="AlbumCover">
            <p>${albumsWeGetBackFromApi[i].name}</p>
            <p>${albumsWeGetBackFromApi[i].artist_name}</p>
          </div>
        `)
      }
      // appends albums to carousel selector
      $('#carousel-selector-' + slideNumber).append(`
        <img src="${albumsWeGetBackFromApi[i].cover_photo_url}" alt="AlbumCover">
      `)
    }
  })
  // catches error and console logs it
  .catch(err => {
    console.log(err);
  })

  // Handles carousel switching interval
  $('#myCarousel').carousel({
    interval: false
  });

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
  