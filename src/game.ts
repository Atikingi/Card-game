import GameRender from './render';

if (!sessionStorage.getItem('status')) {
   sessionStorage.setItem('status', 'start');
}

type Game = {
   status: string;
   difficulty: string;
   cards: string[];
   timer: any;
};

declare global {
   interface Window {
      game: Game;
   }
}

window.game = {
   status: sessionStorage.getItem('status'),
   difficulty: '1',
   cards: [],
   timer: [],
} as Game;

const renderScreens = new GameRender();

class GameEvent {
   container = document.getElementById('container') as HTMLElement;
   startGameButton = document.getElementById('start-game') as HTMLElement;
   clickCount: number = 0;
   compare: string[] = [];
   resultStatus: HTMLElement | null = null;
   resultIcon: HTMLElement | null = null;
   resultTime: HTMLElement | null = null;
   timerValue: HTMLElement | null = null;

   constructor() {
      this.startGameButton.addEventListener('click', (event) => {
         event.preventDefault();

         const { target } = event;

         if (target) {
            this.checkDifficulty(event);
         }
      });

      this.container.addEventListener('click', (event) => {
         const target = event.target as HTMLButtonElement;

         this.cardClickHandler(target);
         this.restartGame(target);
      });
   }

   checkDifficulty(event: Event) {
      const difficultyField: HTMLElement | null =
         document.getElementById('difficulty-field');

      if (difficultyField) {
         difficultyField.childNodes.forEach((node) => {
            if (
               (node as HTMLInputElement).type === 'radio' &&
               (node as HTMLInputElement).checked
            ) {
               window.game.difficulty = (node as HTMLInputElement).value;
            }
         });
      }

      renderScreens.startGame();
      this.timer();
   }

   cardClickHandler(target: HTMLElement | null) {
      if (target && target.dataset.id) {
         if (target.dataset.active) {
            return;
         }

         this.clickCount++;

         const currentCard: HTMLElement | null = document.getElementById(
            target.dataset.id
         );

         if (currentCard) {
            currentCard.classList.toggle('flip');
            target.dataset.active = 'true';
         }

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
      const [firstCard, secondCard] = this.compare;
      if (this.clickCount === 2) {
         secondCard.startsWith(firstCard) || firstCard.startsWith(secondCard)
            ? (this.clickCount = 0)
            : setTimeout(() => {
                 renderScreens.renderResultScreen();
                 this.stopTimer();
                 this.showLostResult();
              }, 100);
         this.clickCount = 0;
         this.compare = [];
      }

      if (!window.game.cards.length) {
         setTimeout(() => {
            renderScreens.renderResultScreen();
            this.stopTimer();
            this.showWinResult();
         }, 500);
      }
   }

   restartGame(target: HTMLButtonElement | null) {
      if (target && target.id === 'restart') {
         renderScreens.restartGame();
         window.game.cards = [];
      }
   }

   timer() {
      let timerField: HTMLElement | null = document.getElementById('timer');
      setTimeout(() => {
         let startTimer = new Date();

         const timerUpdate = (ms: number) => {
            if (timerField) {
               timerField.innerHTML = new Date(ms).toISOString().slice(14, 19);
            }
         };

         window.game.timer.push(
            setInterval(
               () => timerUpdate(new Date().getTime() - startTimer.getTime()),
               500
            )
         );
      }, 5000);
   }

   stopTimer() {
      window.game.timer.map(
         (timer: string | number | NodeJS.Timeout | undefined) =>
            clearInterval(timer)
      );
      window.game.timer = [];
   }

   showLostResult() {
      this.resultStatus = document.getElementById('result-status');
      this.resultIcon = document.getElementById('result-icon');
      this.resultTime = document.getElementById('result-time');
      this.timerValue = document.getElementById('timer');

      if (this.resultStatus && this.resultIcon) {
         this.resultStatus.textContent = 'Вы проиграли!';
         (this.resultIcon as HTMLImageElement).src = '../public/img/lost.svg';
      }

      if (this.resultTime && this.timerValue) {
         this.resultTime.textContent = this.timerValue.textContent;
      }
   }

   showWinResult() {
      this.resultTime = document.getElementById('result-time');
      this.timerValue = document.getElementById('timer');

      if (this.resultTime && this.timerValue) {
         this.resultTime.textContent = this.timerValue.textContent;
      }
   }
}

new GameEvent();
