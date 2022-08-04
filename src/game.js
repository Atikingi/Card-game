import GameRender from '/src/render.js';

if (!sessionStorage.getItem('status')) {
   sessionStorage.setItem('status', 'start');
}

window.game = {
   status: sessionStorage.getItem('status'),
   difficulty: '1',
};

const renderScreens = new GameRender();

class GameEvent {
   container = document.getElementById('container');

   constructor() {
      document
         .getElementById('start-game')
         .addEventListener('click', (event) => {
            event.preventDefault();

            this.checkDifficulty(event);
         });

      this.container.addEventListener('click', (event) => {
         this.flipper(event.target);
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

   flipper(target) {
      if (target.dataset.id) {
         document.getElementById(target.dataset.id).classList.toggle('flip');
      }
   }
}

new GameEvent();
