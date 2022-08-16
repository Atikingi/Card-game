/**
 * @jest-environment jsdom
 */

const { it, expect } = require('@jest/globals');
import GameRender from '../render';
import { ScreensTemplate } from '../types';

it('should render start screen if template-difficulty transferred', () => {
   const screen = new GameRender();
   const screenName = 'template-difficulty';
   const expected: ScreensTemplate = 'template-difficulty';

   screen.renderScreen(screenName);

   expect(expected).toBe(screenName);
});

it('should render game screen if template-game transferred', () => {
   const screen = new GameRender();
   const screenName = 'template-game';
   let expected: ScreensTemplate = 'template-game';

   screen.renderScreen(screenName);

   expect(expected).toBe(screenName);
});

it('should render result screen if template-result transferred', () => {
   const screen = new GameRender();
   const screenName = 'template-result';
   let expected: ScreensTemplate = 'template-result';

   screen.renderScreen(screenName);

   expect(expected).toBe(screenName);
});
