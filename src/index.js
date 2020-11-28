import { el, element, formatLength, videoAge } from './lib/utils';


// Path to get info on videos
const dataPath = './videos.json'

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
		}).then((videoData) => {
      // Poplatte Nýleg mynbdönd
      populateHoverCards('nyleglist', videoData.categories[0].videos, videoData.videos);
       // Populate Kennslumyndbönd
      populateHoverCards('kennslulist', videoData.categories[1].videos, videoData.videos);
      // Populate Skemmtimyndbönd
      populateHoverCards('skemmtilist', videoData.categories[2].videos, videoData.videos);
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
        element('img', {'src': videoData[videoNumber].poster}, null,
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
	window.location.href = ('./pages/videos.html?' + (videoNr+1));
}


