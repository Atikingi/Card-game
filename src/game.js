import GameRender from '/src/render.js';

if (!sessionStorage.getItem('status')) {
   sessionStorage.setItem('status', 'start');
}

window.game = {
   status: sessionStorage.getItem('status'),
   difficulty: '1',
   cards: [],
};

const renderScreens = new GameRender();

class GameEvent {
   container = document.getElementById('container');
   clickCount = 0;
   compare = [];

   constructor() {
      document
         .getElementById('start-game')
         .addEventListener('click', (event) => {
            event.preventDefault();

            this.checkDifficulty(event);
         });

      this.container.addEventListener('click', (event) => {
         this.cardClickHandler(event.target);
      });
   }

   checkDifficulty({ target }) {
      const difficultyField = document.getElementById('difficulty-field');

      difficultyField.childNodes.forEach((node) => {
         if (node.type === 'radio' && node.checked) {
            window.game.difficulty = node.value;
         }
      });

      renderScreens.startGame(target);
   }

   cardClickHandler(target) {
      if (target.dataset.id) {
         if (target.dataset.active) {
            return;
         }

         this.clickCount++;

         document.getElementById(target.dataset.id).classList.toggle('flip');
         target.dataset.active = true;

         const cardIndexOfArray = window.game.cards.indexOf(target.dataset.id);

         if (cardIndexOfArray === -1) {
            return;
         }
         window.game.cards.splice(cardIndexOfArray, 1);

         this.compare.push(target.dataset.id);

         this.checkResult();
      }
   }

   checkResult() {
      if (this.clickCount === 2) {
         this.compare[1].startsWith(this.compare[0]) ||
         this.compare[0].startsWith(this.compare[1])
            ? (this.clickCount = 0)
            : setTimeout(() => {
                 alert('Вы проиграли');
              }, 100);
         this.clickCount = 0;
         this.compare = [];
      }

      if (!window.game.cards.length) {
         setTimeout(() => {
            alert('Вы победили!');
         }, 500);
      }
   }
}

new GameEvent();
