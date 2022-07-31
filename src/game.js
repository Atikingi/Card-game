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
  constructor() {
    document.getElementById('start-game').addEventListener('click', (event) => {
      event.preventDefault();

      this.checkDifficulty(event);
    });
  }

  checkDifficulty(event) {
    const { target } = event;
    const difficultyField = document.getElementById('difficulty-field');

    for (let i = 0; i < difficultyField.children.length; i++) {
      if (
        difficultyField.children[i].type === 'radio' &&
        difficultyField.children[i].checked
      ) {
        game.difficulty = difficultyField.children[i].value;
      }
    }

    renderScreens.startGame(target);
  }
}

const gameEvent = new GameEvent();
