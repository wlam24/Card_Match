const cardBox = document.querySelector('.card-container');
const levelBox = document.querySelector('.level-container');
let cardsFlipped = 0;

function flip(event) {
  if(event.target.className !== 'card') {
  return;
  }
  event.target.firstElementChild.setAttribute('data-status', 'flipped'); // image
  event.target.firstElementChild.style.display = 'block'; // image
  event.target.firstElementChild.style.background = 'rgb(176, 174, 174)'; // image
  event.target.style.backgroundColor = 'none' // div
  cardsFlipped++
  if (cardsFlipped === 2) {
    const results = document.querySelectorAll("[data-status='flipped']");
    cardsFlipped = 0
    if (results) {
      const [image1, image2] = results;
      if(image1.src === image2.src) {
        image1.setAttribute('data-status', 'match');
        image2.setAttribute('data-status', 'match');
        image1.style.background = 'black';
        image2.style.background = 'black';
        let matches = document.querySelector('.numberOfMathes').textContent;
        matches = Number(matches) + 1;
        document.querySelector('.numberOfMatches').textContent = matches;
      } else {
        setTimeout(() => {
          image1.setAttribute('data=status', "");
          image2.setAttribute('data=status', "");
          image1.parentElement.style.background = 'rgb(87,126, 160)';
          image2.parentElement.style.background = 'rgb(87,126, 160)';
          image1.style.display = 'none';
          image2.style.display = 'none';
        }, 1000)
        }
        let moves = document.querySelector('.moves').textContent;
        moves = Number(moves) + 1
        document.querySelector('.moves').textContent = moves
      }

      }
    }

    function easy(event) {
      if (event.target.innerText !== "Easy")
      return;
      let count = 0
      for (let i = 0; i < 7; i++) {
        count++
        const div = document.createElement('div');
        const img = document.createElement('img');
        div.setAttribute('class', 'card');
        img.setAttribute('src', 'images/image' + count + '.png');
        img.setAttribute('data-status', '');
        div.appendChild(img);
        cardBox.appendChild(div);
        console.log(div)
      }
    }



cardBox.addEventListener('click', flip);
levelBox.addEventListener('click', easy);
