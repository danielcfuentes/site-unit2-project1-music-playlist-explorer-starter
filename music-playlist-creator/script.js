// ----------------------------  Creating Playlists  -------------------------------
function iteratePlaylist(listOfPlaylists){
   console.log('iteratePlaylist function')
   const playListCardsContainer = document.querySelector(".playlist-cards");
   playListCardsContainer.innerHTML = "";
   for (let playlist of listOfPlaylists){
      const card = document.createElement('section');
      card.className = 'indvidual-card';
      card.innerHTML = `
         <span class="delete">&times;</span>

         <img src="${playlist.playlist_art}" alt="Playlist Cover" id = "playlist-img">
         <h2 class = "text-card">${playlist.playlist_name}</h2>
         <p>Creator: ${playlist.playlist_creator}</p>


         <button class = "like-container" id = "button">
            <p id = "heart-img">❤️</p> 
            <p class = "like-button">${playlist.likeCount}</p>
         </button>

      
      `;

      card.addEventListener("click", (event) => {
                        //title and create and image
         populateModal(playlist);
  

         


   //-------------- SHUFFLE ---------------------------------------------------
         const shuffleButton = document.querySelector("#buttonShuffle")
         shuffleButton.addEventListener("click", function(){
            //const itemList = playlist.songs;
            const shuffledList = randomize(playlist);


            
            populateModal(shuffledList)

   //--------------- END SHUFFLE --------------------------------------------
         })

      })

      //-------------- Likes ----------------------------
      //const likeButtonContainer = document.querySelector(".like-container")

           // Add event listener to the like button to increase the like count when clicked
      const likeButton = card.querySelector("#button");
      likeButton.addEventListener("click", (e) => {
         e.stopPropagation();

            playlist.likeCount++;
            likeButton.querySelector(".like-button").textContent = playlist.likeCount;
         // }
      });

      const deleteButton = card.querySelector(".delete");
      deleteButton.addEventListener("click", (e) => {
         e.stopPropagation();

         card.remove()
         // }
      });

      //-------------- FINISHED LIKES --------------------

      playListCardsContainer.appendChild(card)
   }
   
 }

document.addEventListener("DOMContentLoaded", function(){
    iteratePlaylist(data.playlists);
});

 //----------------------------------------    SEARCHING --------------------------------------------

 if ( window.location.pathname.split("/").pop() === "index.html" ) {
 // Select the search bar input element
const searchInput = document.querySelector(".playlist-search");

// Add an input event listener to the search bar input element
searchInput.addEventListener("input", event => {
  // Get the current search query from the input value
  const searchQuery = event.target.value;

  // Filter the playlists based on the search query
  const filteredPlaylists = data.playlists.filter(playlist => (
    playlist.playlist_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    playlist.playlist_creator.toLowerCase().includes(searchQuery.toLowerCase())
   //  return nameMatches || creatorMatches;
  ));
  console.log(filteredPlaylists);

  // Update the display to show only the matching playlists
  iteratePlaylist(filteredPlaylists)
  
});}

// ----------------------------  SHOWING Songs -----------------------------------


function populateModal(playlist){
   songs = playlist.songs

   document.getElementById("big-img").src = playlist.playlist_art
   document.getElementById("PlaylistTitle").innerText = playlist.playlist_name
   document.getElementById("CreatorName").innerText = playlist.playlist_creator



   // Get all playlist cards
   const playlistCards = document.querySelector(".song-list");
   playlistCards.innerHTML=''

   console.log('35')
   for(let song of songs){
      console.log('enter for loop 37')

      const modalPlaylist = document.createElement('div')
      console.log('create modalPlaylist')

      modalPlaylist.className = 'Songs'
      modalPlaylist.id = "Songs-homepage"
      console.log('43')

      modalPlaylist.innerHTML = `


      <div class= "each-song">
         <img id = "song-img" src = "${song.cover_art}">
         <div class = "text">
            <h3 id ="SongTitle"><li > ${song.title}</li></h3>
            <p id="ArtistName">${song.artist}</p>
            <p id="AlbumName">${song.album}</p>
            <p id = "Duration">${song.duration} min</p>
         </div>
      </div>
      `;
      console.log('54')

      playlistCards.appendChild(modalPlaylist)
      
      
   }
}

//------------------------------ Shuffling Playlists ---------------------------------

// A function to generate a random 
// permutation of arr
function randomize (playlist) 
{
   songs = playlist.songs
   console.log
   songs.sort((a, b) => 0.5 - Math.random())
   return playlist
} 



// -----------------------------  JavaScript for Opening and Closing the Modal -------------------------------

// Wait for the window to finish loading before executing the code
window.addEventListener("load", () => {
   // Retrieve the modal element with the id "playlistModal"
   var modal = document.getElementById("playlistModal");
   
   // Retrieve the close button element (likely a span or button) with the class "close"
   // We're only selecting the first element with this class, hence the [0] index
   var span = document.getElementsByClassName("close")[0];
   
   // Define the openModal function, which will be called when a playlist card is clicked
   function openModal() {
     // Step 1: Show the modal by setting its display style to "block"
     modal.style.display = "block";
     
     // Step 2: Fill in the playlist title and creator name into the modal's inner text
     // We're assuming "playlist" and "fcreator" are objects with "title" and "name" properties, respectively

   //   document.getElementById('PlaylistTitle').innerText = data.playlist.title;
   //   document.getElementById('CreatorName').innerText = `Creator Name: ${fcreator.name}`;
   }


   
   // Add an event listener to the close button
   // When the close button is clicked, hide the modal by setting its display style to "none"
   span.onclick = function() {
     modal.style.display = "none";
   }
   
   // Add an event listener to the window
   // When the user clicks anywhere outside the modal (i.e., the window is clicked),
   // hide the modal by setting its display style to "none"
   window.onclick = function(event) {
     // Check if the target of the click event is the modal itself
     if (event.target == modal) {
       modal.style.display = "none";
     }
   }
   

   // Add an event listener to the playlist cards container (likely a div or ul)
   // We're only selecting the first element with the class "playlist-cards", hence the [0] index
   document.getElementsByClassName("playlist-cards")[0].addEventListener("click", (event) => {
     // Log the target of the click event to the console (for debugging purposes)
     console.log(event.target);
     
     // Call the openModal function to show the modal and fill in the playlist info
     openModal();
     
   })
 })


// ---------------------------------  FEATURE -------------------------------

// Function to select a random playlist from the data and display its details on the Featured page
function displayRandomPlaylist(listOfPlaylists) {
   // Select a random playlist object from the data.playlists array
   // iteratePlaylist(listOfPlaylists)

   const randomIndex = Math.floor(Math.random() * listOfPlaylists.length);
   const randomPlaylist = listOfPlaylists[randomIndex];
   
   // Update the playlist image, name, and list of songs dynamically based on the selected playlist
   const playlistImage = document.querySelector(".playlist-image img");
   playlistImage.src = randomPlaylist.playlist_art;
   
   const playlistName = document.querySelector(".playlist-name h1");
   playlistName.textContent = randomPlaylist.playlist_name;
   
   const creatorName = document.querySelector(".playlist-name h3");
   creatorName.textContent = randomPlaylist.playlist_creator;
   
   const songList = document.querySelector(".Songs-feature");
   songList.innerHTML = "";

   randomPlaylist.songs.forEach(function(song) {

     const songItem = document.createElement("li");
     const songImg = document.createElement("img");
     songImg.src = song.cover_art;
     songImg.id = "song-img-feature";

     const songText = document.createElement("div");
     songText.className = "text";

     const songTitle = document.createElement("h3");
     songTitle.textContent = song.title;

     const artistName = document.createElement("p");
     artistName.textContent = song.artist;

     const albumName = document.createElement("p");
     albumName.textContent = song.album;

     const duration = document.createElement("p");
     duration.textContent = song.duration;
     duration.id = "Duration-feature"

     songText.appendChild(songTitle);
     songText.appendChild(artistName);
     songText.appendChild(albumName);
     songText.appendChild(duration);

     const songContainer = document.createElement("div");
     songContainer.className = "each-song-feature";

     songContainer.appendChild(songImg);
     songContainer.appendChild(songText);
     songList.appendChild(songContainer);
   });
 }
 
 // Call the displayRandomPlaylist() function when the page loads
 document.addEventListener("DOMContentLoaded", function(){
   displayRandomPlaylist(data.playlists);
});

