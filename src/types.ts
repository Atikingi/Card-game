export type ScreensTemplate =
   | 'template-difficulty'
   | 'template-game'
   | 'template-result';

export type Game = {
   status: string;
   difficulty: string;
   cards: string[];
   timer: any;
};

export type CardsObject = {
   dignity: string;
   suit: { name: string; src: string; srcBigIcon: string };
};
