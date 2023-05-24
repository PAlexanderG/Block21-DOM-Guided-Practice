// Asynchronous `init` function
async function init() {
  // Function called `fetchAllSongs plus an asynchronous function
  const fechAllSongs = async (SONGS_API_URL) => {}; // (?)
  // Fetch all songs from the server and return as JSON
  try {
    // create a variable for response (ASYNC/AWAIT): Promises
    const response = await fetch();
    const data = await response.json();
    // return variable
    return data;
    // local variable
  } catch (error) {
    // The console module provides a simple debugging console that is similar to the JavaScript
    // console mechanism provided by web browsers.
    console.log(error);
  }
}
// Call the `fetchAllSongs` function inside your `init` function and console.log the result.
// You should see an array of all songs in your browser console.
async function init() {
  const songs = await fetchAllSongs();
  console.log(songs);
}
// Write a function called `renderAllSongs` that will take in an array of songs and render them
// to the DOM. You can use the `renderAllRecipes` function we wrote in the previous demonstration as a reference.
function renderSongs(songs) {
  const songContainer = document.querySelector("#song-container");
  songContainer.innerHTML = "";
  songs.forEach((song) => {
    const songElement = renderSong(song);
    songContainer.append(songElement);
  });
}
// Call the `renderSongs` function inside your `init` function and pass in the array of songs you got
// from the server
async function init() {
  const songs = await fetchAllSongs();
  renderSongs(songs);
}
// Write a function called `addNewSong` that will take in a song object and create a new
// song on the server. This function should return the newly created song.
async function addNewSong(song) {
  const response = await fetch("/api/guided-practice/songs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(song),
  });
  const newSong = await response.json();
  return newSong;
}
// Write a new function called `renderNewSongForm` that will render a form to the DOM.
// The form should have inputs for the following fields: title, artist, genre, and release date.
// The form should also have a submit button.
function renderNewSongForm() {
  const newSongForm = document.querySelector("#new-song-form");
  newSongForm.innerHTML = `
      <form>
        <label for="title">Title</label>
        <input type="text" name="title" id="title" />
        <label for="artist">Artist</label>
        <input type="text" name="artist" id="artist" />
        <label for="genre">Genre</label>
        <input type="text" name="genre" id="genre" />
        <label for="release-date">Release Date</label>
        <input type="date" name="release-date" id="release-date" />
        <button type="submit">Submit</button>
      </form>
    `;
}
// Call the `renderNewSongForm` function inside your `init` function.
async function init() {
  const songs = await fetchAllSongs();
  renderSongs(songs);
  renderNewSongForm();
}
// Inside your `renderNewSongForm` function, add an event listener to the form that will
// listen for the submit event. When the form is submitted, the event listener should prevent
// the default behavior of the form and call the `addNewSong` function. The `addNewSong` function
// should take in an object with the following keys: title, artist, genre, and releaseDate.
// The values for these keys should be the values from the form inputs.
newSongForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const artist = document.getElementById("artist").value;
  const genre = document.getElementById("genre").value;
  const releaseDate = document.getElementById("release-date").value;

  const newSong = {
    title,
    artist_id: artist,
    genre_id: genre,
    release_date: releaseDate,
  };

  await addNewSong(newSong);
  const songs = await fetchAllSongs();
  renderAllSongs(songs);
});
// Call the `init` function
init();
