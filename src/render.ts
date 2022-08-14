import { CardsObject, ScreensTemplate } from './types';

export default class GameRender {
   container: HTMLElement | null = document.getElementById('container');
   cardsByDifficulty: number[] = [3, 6, 12];
   difficultyForm: HTMLElement | null = null;
   templateItem: HTMLElement | null = null;
   clone: HTMLElement | null = null;
   gameScreen: HTMLElement | null = null;
   resultScreen: HTMLElement | null = null;
   cardField: HTMLElement | null = null;
   static templateCard: {
      dignity: string;
      suit: { name: string; src: string; srcBigIcon: string };
   }[];

   constructor() {
      this.checkGameStatus();
   }

   checkGameStatus() {
      if (window.game.status === 'start') {
         this.renderScreen('template-difficulty');
         this.difficultyForm = document.getElementById('difficulty-form');

         if (this.difficultyForm) {
            this.difficultyForm.classList.remove('game__difficulty_hidden');
         }
      }

      if (window.game.status === 'game') {
         this.renderScreen('template-difficulty');
      }
   }

   renderScreen(templateName: ScreensTemplate) {
      this.templateItem = document.getElementById(templateName);
      if (
         this.templateItem &&
         this.templateItem instanceof HTMLTemplateElement
      ) {
         this.clone = this.templateItem.content.cloneNode(true) as HTMLElement;
      }
      if (this.container && this.clone) {
         this.container.appendChild(this.clone);
      }
   }

   startGame() {
      if (this.difficultyForm) {
         this.difficultyForm.classList.add('game__difficulty_hidden');
      }
      window.game.status = 'game';

      this.renderScreen('template-game');

      this.renderCard();
   }

   renderResultScreen() {
      this.renderScreen('template-result');
   }

   restartGame() {
      window.game.status === 'start';

      this.difficultyForm = document.getElementById('difficulty-form');

      if (this.difficultyForm) {
         this.difficultyForm.classList.remove('game__difficulty_hidden');
      }

      this.gameScreen = document.getElementById('screen-game');
      this.resultScreen = document.getElementById('screen-result');

      if (window.game.status === 'game' && this.gameScreen) {
         this.gameScreen.remove();
         if (this.resultScreen) {
            this.resultScreen.remove();
         }
      }
   }

   createCard(
      dignityValue: string,
      smallIcon: string,
      bigIcon: string,
      suitName: string
   ) {
      const checkDataSetId = () => {
         const datIdName = suitName + dignityValue;
         return document.getElementById(datIdName)
            ? datIdName + 'double'
            : datIdName;
      };

      const addClass = (classArray: string[], element: HTMLElement | null) => {
         if (classArray.length === 1 && element) {
            element.classList.add(classArray[0]);
         } else {
            if (element) {
               element.classList.add(...classArray);
            }
         }
      };

      const addDataAttrs = (
         objectOfAttrs: Record<string, string>,
         element: HTMLElement | null
      ) => {
         for (let key in objectOfAttrs) {
            if (element) {
               element.dataset[key] =
                  objectOfAttrs[key as keyof typeof objectOfAttrs];
            }
         }
      };

      const addStyle = (
         objectOfStyles: Record<string, string>,
         element: HTMLElement | null
      ) => {
         for (let key in objectOfStyles) {
            if (element) {
               element.dataset[key] = objectOfStyles[key];
            }
         }
      };

      const addId = (element: HTMLElement | null, idValue: string) => {
         if (element) {
            element.id = idValue;
         }
      };

      const addSrc = (srcValue: string, element: HTMLImageElement) => {
         element.src = srcValue;
      };

      const addTextContent = (
         textContentValue: string,
         element: HTMLElement | null
      ) => {
         if (element) {
            element.textContent = textContentValue;
         }
      };

      window.game.cards.push(checkDataSetId());

      const fragment = document.createDocumentFragment();

      const cardWrapper = document.createElement('div');
      addClass(['game__card-wrapper', 'flip'], cardWrapper);
      addDataAttrs({ dignity: dignityValue, suit: suitName }, cardWrapper);
      addId(cardWrapper, checkDataSetId());

      setTimeout(() => {
         cardWrapper.classList.remove('flip');
      }, 5000);

      const card = document.createElement('div');
      addClass(['game__card'], card);
      addDataAttrs({ id: checkDataSetId() }, card);

      const cardBack = document.createElement('div');
      addClass(['game__card-back'], cardBack);
      addDataAttrs({ id: checkDataSetId() }, cardBack);

      const cardFront = document.createElement('div');
      addClass(['game__card-front'], cardFront);
      addDataAttrs({ id: checkDataSetId(), active: 'true' }, cardFront);

      const indexBox = document.createElement('div');
      addClass(['game__card-index-box'], indexBox);

      const dignity = document.createElement('div');
      addClass(['game__card-dignity'], dignity);
      addTextContent(dignityValue, dignity);
      addDataAttrs({ id: checkDataSetId(), active: 'true' }, dignity);

      const suitSmallIcon = document.createElement('img');
      addClass(['game__card-suit'], suitSmallIcon);
      addSrc(smallIcon, suitSmallIcon);
      addDataAttrs({ id: checkDataSetId(), active: 'true' }, suitSmallIcon);

      const dignityReverse = document.createElement('div');
      addClass(['game__card-dignity'], dignityReverse);
      addTextContent(dignityValue, dignityReverse);

      const suitSmallIconReverse = document.createElement('img');
      addClass(['game__card-suit'], suitSmallIconReverse);
      addSrc(smallIcon, suitSmallIconReverse);

      const suitBigIcon = document.createElement('img');
      addClass(['game__card-suit-big'], suitBigIcon);
      addSrc(bigIcon, suitBigIcon);
      addStyle({ width: '29', height: '26' }, suitBigIcon);
      addDataAttrs({ id: checkDataSetId(), active: 'true' }, suitBigIcon);

      const indexBoxReverse = document.createElement('div');
      indexBoxReverse.classList.add(
         'game__card-index-box',
         'game__card-index-box__rotate'
      );

      cardFront.appendChild(indexBox);
      cardFront.appendChild(suitBigIcon);
      cardFront.appendChild(indexBoxReverse);
      indexBox.appendChild(dignity);
      indexBox.appendChild(suitSmallIcon);
      indexBoxReverse.appendChild(dignityReverse);
      indexBoxReverse.appendChild(suitSmallIconReverse);

      card.appendChild(cardBack);
      card.appendChild(cardFront);

      cardWrapper.appendChild(card);

      fragment.appendChild(cardWrapper);

      this.cardField = document.getElementById('card-field');

      if (this.cardField) {
         this.cardField.appendChild(fragment);
      }
   }

   shuffleCards(array: object[]) {
      for (let i = array.length - 1; i > 0; i--) {
         let randomIndex = Math.floor(Math.random() * (i + 1));
         [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
      }
      return array;
   }

   renderCard() {
      let cardValues = GameRender.templateCard;
      const difficulty = Number(window.game.difficulty);
      const numberOfCards = this.cardsByDifficulty[difficulty];
      // Array<CardsObject>
      let cardValues2: CardsObject[] = this.shuffleCards(
         cardValues
      ) as CardsObject[];

      cardValues2 = cardValues2.slice(0, numberOfCards);
      cardValues2.push(...cardValues2);
      cardValues2 = this.shuffleCards(cardValues2) as CardsObject[];

      cardValues2.forEach((card) => {
         this.createCard(
            card.dignity,
            card.suit.src,
            card.suit.srcBigIcon,
            card.suit.name
         );
      });
   }
}

GameRender.templateCard = [
   {
      dignity: 'A',
      suit: {
         name: 'spades',
         src: './public/img/spades.svg',
         srcBigIcon: './public/img/spades-big.svg',
      },
   },
   {
      dignity: 'K',
      suit: {
         name: 'spades',
         src: './public/img/spades.svg',
         srcBigIcon: './public/img/spades-big.svg',
      },
   },
   {
      dignity: 'Q',
      suit: {
         name: 'spades',
         src: './public/img/spades.svg',
         srcBigIcon: './public/img/spades-big.svg',
      },
   },
   {
      dignity: 'J',
      suit: {
         name: 'spades',
         src: './public/img/spades.svg',
         srcBigIcon: './public/img/spades-big.svg',
      },
   },
   {
      dignity: '10',
      suit: {
         name: 'spades',
         src: './public/img/spades.svg',
         srcBigIcon: './public/img/spades-big.svg',
      },
   },
   {
      dignity: '9',
      suit: {
         name: 'spades',
         src: './public/img/spades.svg',
         srcBigIcon: './public/img/spades-big.svg',
      },
   },
   {
      dignity: '8',
      suit: {
         name: 'spades',
         src: './public/img/spades.svg',
         srcBigIcon: './public/img/spades-big.svg',
      },
   },
   {
      dignity: '7',
      suit: {
         name: 'spades',
         src: './public/img/spades.svg',
         srcBigIcon: './public/img/spades-big.svg',
      },
   },
   {
      dignity: '6',
      suit: {
         name: 'spades',
         src: './public/img/spades.svg',
         srcBigIcon: './public/img/spades-big.svg',
      },
   },
   {
      dignity: 'A',
      suit: {
         name: 'hearts',
         src: './public/img/hearts.svg',
         srcBigIcon: './public/img/hearts-big.svg',
      },
   },
   {
      dignity: 'K',
      suit: {
         name: 'hearts',
         src: './public/img/hearts.svg',
         srcBigIcon: './public/img/hearts-big.svg',
      },
   },
   {
      dignity: 'Q',
      suit: {
         name: 'hearts',
         src: './public/img/hearts.svg',
         srcBigIcon: './public/img/hearts-big.svg',
      },
   },
   {
      dignity: 'J',
      suit: {
         name: 'hearts',
         src: './public/img/hearts.svg',
         srcBigIcon: './public/img/hearts-big.svg',
      },
   },
   {
      dignity: '10',
      suit: {
         name: 'hearts',
         src: './public/img/hearts.svg',
         srcBigIcon: './public/img/hearts-big.svg',
      },
   },
   {
      dignity: '9',
      suit: {
         name: 'hearts',
         src: './public/img/hearts.svg',
         srcBigIcon: './public/img/hearts-big.svg',
      },
   },
   {
      dignity: '8',
      suit: {
         name: 'hearts',
         src: './public/img/hearts.svg',
         srcBigIcon: './public/img/hearts-big.svg',
      },
   },
   {
      dignity: '7',
      suit: {
         name: 'hearts',
         src: './public/img/hearts.svg',
         srcBigIcon: './public/img/hearts-big.svg',
      },
   },
   {
      dignity: '6',
      suit: {
         name: 'hearts',
         src: './public/img/hearts.svg',
         srcBigIcon: './public/img/hearts-big.svg',
      },
   },
   {
      dignity: 'A',
      suit: {
         name: 'diamonds',
         src: './public/img/diamonds.svg',
         srcBigIcon: './public/img/diamonds-big.svg',
      },
   },
   {
      dignity: 'K',
      suit: {
         name: 'diamonds',
         src: './public/img/diamonds.svg',
         srcBigIcon: './public/img/diamonds-big.svg',
      },
   },
   {
      dignity: 'Q',
      suit: {
         name: 'diamonds',
         src: './public/img/diamonds.svg',
         srcBigIcon: './public/img/diamonds-big.svg',
      },
   },
   {
      dignity: 'J',
      suit: {
         name: 'diamonds',
         src: './public/img/diamonds.svg',
         srcBigIcon: './public/img/diamonds-big.svg',
      },
   },
   {
      dignity: '10',
      suit: {
         name: 'diamonds',
         src: './public/img/diamonds.svg',
         srcBigIcon: './public/img/diamonds-big.svg',
      },
   },
   {
      dignity: '9',
      suit: {
         name: 'diamonds',
         src: './public/img/diamonds.svg',
         srcBigIcon: './public/img/diamonds-big.svg',
      },
   },
   {
      dignity: '8',
      suit: {
         name: 'diamonds',
         src: './public/img/diamonds.svg',
         srcBigIcon: './public/img/diamonds-big.svg',
      },
   },
   {
      dignity: '7',
      suit: {
         name: 'diamonds',
         src: './public/img/diamonds.svg',
         srcBigIcon: './public/img/diamonds-big.svg',
      },
   },
   {
      dignity: '6',
      suit: {
         name: 'diamonds',
         src: './public/img/diamonds.svg',
         srcBigIcon: './public/img/diamonds-big.svg',
      },
   },
   {
      dignity: 'A',
      suit: {
         name: 'clubs',
         src: './public/img/clubs.svg',
         srcBigIcon: './public/img/clubs-big.svg',
      },
   },
   {
      dignity: 'K',
      suit: {
         name: 'clubs',
         src: './public/img/clubs.svg',
         srcBigIcon: './public/img/clubs-big.svg',
      },
   },
   {
      dignity: 'Q',
      suit: {
         name: 'clubs',
         src: './public/img/clubs.svg',
         srcBigIcon: './public/img/clubs-big.svg',
      },
   },
   {
      dignity: 'J',
      suit: {
         name: 'clubs',
         src: './public/img/clubs.svg',
         srcBigIcon: './public/img/clubs-big.svg',
      },
   },
   {
      dignity: '10',
      suit: {
         name: 'clubs',
         src: './public/img/clubs.svg',
         srcBigIcon: './public/img/clubs-big.svg',
      },
   },
   {
      dignity: '9',
      suit: {
         name: 'clubs',
         src: './public/img/clubs.svg',
         srcBigIcon: './public/img/clubs-big.svg',
      },
   },
   {
      dignity: '8',
      suit: {
         name: 'clubs',
         src: './public/img/clubs.svg',
         srcBigIcon: './public/img/clubs-big.svg',
      },
   },
   {
      dignity: '7',
      suit: {
         name: 'clubs',
         src: './public/img/clubs.svg',
         srcBigIcon: './public/img/clubs-big.svg',
      },
   },
   {
      dignity: '6',
      suit: {
         name: 'clubs',
         src: './public/img/clubs.svg',
         srcBigIcon: './public/img/clubs-big.svg',
      },
   },
];
