import { el, element, formatLength, videoAge } from './lib/utils';


// Path to get info on videos
const dataPath = '../videos.json'

// Get query from path
const parm = window.location.search;
const video = parm.substring(1);

// videoElement variable, container for video
const videoElement = document.getElementById('videoelement');

// Loads hovercards once all other DOM content has been loaded
document.addEventListener('DOMContentLoaded', async () => {
  fetchVideoData();
});

function fetchVideoData() {
  fetch(dataPath)
		.then((result) => {
			if(!result.ok){
				throw new Error('Gat ekki sótt upplýsingar um video')
			}
      return result.json();
		}).then((Data) => {
        const videoData = Data.videos[video-1];

        // Add video title to heading
        document.getElementById('video-nafn').textContent = videoData.title;
        // Add video to player
        videoElement.setAttribute('src', ('.'+ videoData.video));



        // Add video description
        document.getElementById('videolysing').textContent = videoData.description;

        // Add related videos to bottom of page
        if(videoData.related.length !== 0){
          document.getElementById('tengdheading').textContent = "Tengd myndbönd";
          populateHoverCards('tengdlist', videoData.related, Data.videos);
        }



    })
}

// Function which populates each hoverCard element using
// the data from the videos.json file
function populateHoverCards(listElement, list, videos){
  let section = document.getElementById(listElement);
  for(let i = 0; i < list.length; i++){
    addHoverCard(section, list[i]-1, videos);
  }
}

// Function which add a hoverCard element to html page
function addHoverCard(section, videoNumber, videoData){
  const hoverElement =
    element('div', {'class': 'hovercard'}, null,
      element('div', {'class': 'poster'}, {click: () => {hoverClicked(videoNumber);}},
        element('img', {'src': ('.' + videoData[videoNumber].poster)}, null,
          el('div', null)
        ),
        el('p', formatLength(videoData[videoNumber].duration))
      ),
      element('div', {'class': 'list-text'}, null,
        el('h3', videoData[videoNumber].title),
        el('p',  videoAge(videoData[videoNumber].created))
      )
  );
  section.appendChild(hoverElement);
}

// OnClick event for hoverCards, links to videos.html video numberwith
// as a url query string
function hoverClicked(videoNr){
	window.location.href = ('./videos.html?' + (videoNr+1));
}

// Controls for video defined

// function for back and next buttons
function backNext(backOrNext){
  let increment = 0;
  if(backOrNext === "back"){
    increment = -3;
  }else{
    increment = 3;
  }
   videoElement.currentTime += increment;
}

//Add function to back and next buttons
document.getElementById("back").addEventListener("click", () => {
  videoElement.currentTime -= 3;
});
document.getElementById("next").addEventListener("click", () => {
  videoElement.currentTime += 3;
});

// Function to play/pause video
const play = document.getElementById("play");
function playPause() {
  if (videoElement.paused == true){
    videoElement.play();
    play.childNodes[0].setAttribute('src', '../img/pause.svg');
  }else{
    videoElement.pause();
    play.childNodes[0].setAttribute('src', '../img/play.svg');
  }
}

//Add function to play button and videoElement

play.addEventListener("click", playPause);
videoElement.addEventListener("click", playPause);

//Add function to mute button
const mute = document.getElementById("mute");
mute.addEventListener("click", () => {
  if (videoElement.muted == true){
    videoElement.muted = false;
    mute.childNodes[0].setAttribute('src', '../img/mute.svg');
  }else{
    videoElement.muted = true;
    mute.childNodes[0].setAttribute('src', '../img/unmute.svg');
  }
});

document.getElementById("fullscreen").addEventListener('click', () => {
  videoElement.requestFullscreen();
});

