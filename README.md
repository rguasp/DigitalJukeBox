# DigitalJukeBox
This is a simple Digital Jukebox.

Using HTML, CSS, Javascript, Bootstrap and Jquery to make a responsive jukebox clone.

Utilizing these 2 API's with Axios request to call
1. ALBUMS
This service provides a JSON array of albums available.
SERVICE API URL:
https://stg-resque.hakuapp.com/albums.json
RETURNS JSON OBJECT ARRAY:
2. SONGS
This service provides a list of songs for a specific album.
SERVICE API URL:
https://stg-resque.hakuapp.com/songs.json?album_id=1
INPUT PARAMETER: album_id (integer)
RETURNS JSON OBJECT ARRAY:

#Development Demo

Before deploying development demo install this google chrome plugin:
(Due to Cors error unrelated to axios, Api cant handle cors also because im not using express
(work in progress))
(install following plug-in)
https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en





