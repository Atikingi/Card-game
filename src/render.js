export default class GameRender {
  container = document.getElementById('container');

  constructor() {
    this.checkGameStatus();
  }

  checkGameStatus() {
    if (game.status === 'start') {
      this.renderScreen('template-difficulty');

      this.difficultyForm = document.getElementById('difficulty-form');
      this.difficultyForm.classList.remove('game__difficulty__hidden');
    }
  }

  renderScreen(templateName) {
    const templateItem = document.getElementById(templateName);
    const clone = templateItem.content.cloneNode(true);

    this.container.appendChild(clone);
  }

  startGame() {
    this.difficultyForm.classList.add('game__difficulty__hidden');

    game.status = 'game';

    this.renderScreen('template-game');
  }
}
