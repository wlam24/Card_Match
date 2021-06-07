const cardBox = document.querySelector(".card-container");
const levelBox = document.querySelector(".level-container");
let cardsFlipped = 0;
let matches = document.querySelector(".numberOfMatches").textContent;
let moves = document.querySelector(".moves").textContent;

function flip(event) {
  if (event.target.className !== 'card') {
    return;
  }
  if (event.target.firstElementChild.attributes['data-status'].value === 'match' || event.target.firstElementChild.attributes['data-status'].value === 'flipped' || cardsFlipped === 2) {
    return;
  }
  event.target.firstElementChild.setAttribute("data-status", "flipped");
  event.target.firstElementChild.style.display = "block";
  event.target.firstElementChild.style.background = "rgb(176, 174, 174)";
  event.target.style.backgroundColor = "none";
  cardsFlipped++;
  console.log(cardsFlipped)
  if (cardsFlipped === 2) {
    const results = document.querySelectorAll("[data-status='flipped']");
    cardsFlipped = 0;
    if (results) {
      const [image1, image2] = results;
      if (image1.src === image2.src) {
        image1.setAttribute("data-status", "match");
        image2.setAttribute("data-status", "match");
        image1.style.backgroundColor = "black";
        image2.style.backgroundColor = "black";
        matches = Number(matches) + 1;
        document.querySelector(".numberOfMatches").textContent = " " + matches;
      } else {
        setTimeout(() => {
          image1.setAttribute("data-status", "");
          image2.setAttribute("data-status", "");
          image1.parentElement.style.background = "rgb(87, 126, 160)";
          image2.parentElement.style.background = "rgb(87, 126, 160)";
          image1.style.display = "none";
          image2.style.display = "none";
        }, 300);
      }
      moves = Number(moves) + 1;
      document.querySelector(".moves").textContent = " " + moves;
    }
  }
}

let mode = null

const levels = {
  easy: 3,
  medium: 6,
  hard: 10,
}

function reset() {
  cardsFlipped = 0
  document.querySelector(".moves").textContent = " " + 0;
  document.querySelector(".numberOfMatches").textContent = " " + 0;
}

function easy(event) {
  if (event.target.localName !== 'button') return;
  cardBox.innerHTML = "";
  mode = event.target.textContent.toLowerCase()
  if (mode) {
    reset()
    const numOfPairs = levels[mode];
    const obj = {};
    while (Object.keys(obj).length < numOfPairs) {
      const randomNumOfImages = Math.ceil(Math.random()*10);
      if (!obj['hasOwnProperty'](randomNumOfImages)) {
        obj[randomNumOfImages] = 0;
      }
    }
      while (cardBox.children.length < numOfPairs*2 ) {
      const imageKeyNum = Math.floor(Math.random()*numOfPairs) 
      const arrNum = Object.keys(obj)[imageKeyNum];
      if (obj[arrNum] !== 2){
        obj[arrNum] = obj[arrNum]+1 || 1
        const div = document.createElement('div');
        const img = document.createElement('img');
          div.setAttribute('class', 'card');
          img.src = `images/image${arrNum}.png`;
          img.setAttribute('data-status', '');
          div.appendChild(img);
          cardBox.appendChild(div); 
      }
    }
  }
}

cardBox.addEventListener("click", flip);
levelBox.addEventListener("click", easy);


