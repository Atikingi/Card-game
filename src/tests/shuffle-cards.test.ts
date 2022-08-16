/**
 * @jest-environment jsdom
 */

const { it, expect } = require('@jest/globals');
import GameRender from '../render';

it('should back array to same length', () => {
   const screen = new GameRender();
   const cardsArray = [{ card: 1 }, { card: 2 }, { card: 3 }, { card: 4 }];

   const shuffleArray = screen.shuffleCards(cardsArray);

   expect(shuffleArray).toHaveLength(cardsArray.length);
});
