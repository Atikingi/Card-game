export default class gameRender {
  CONTAINER = document.getElementById('container');

  constructor() {
    this.checkGameStatus();
  }

  checkGameStatus() {
    if (game.status === 'start') {
      this.renderScreen('template-difficulty');
    }
  }

  renderScreen(templateName) {
    const templateDifficulty = document.getElementById(templateName);
    const clone = templateDifficulty.content.cloneNode(true);

    this.CONTAINER.appendChild(clone);
  }
}
