import GameRender from '/src/render.js';

if (!sessionStorage.getItem('status')) {
  sessionStorage.setItem('status', 'start');
}

window.game = {
  status: sessionStorage.getItem('status'),
};

const renderScreens = new GameRender();
