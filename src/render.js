export default class GameRender {
   container = document.getElementById('container');
   cardsByDifficulty = [3, 6, 12];

   constructor() {
      this.checkGameStatus();
   }

   checkGameStatus() {
      if (window.game.status === 'start') {
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

      window.game.status = 'game';

      this.renderScreen('template-game');

      this.renderCard();
   }

   playAgain() {
      document.getElementById('card-field').innerHTML = '';
      this.renderCard();
   }

   createCard(dignityValue, smallIcon, bigIcon, suitName) {
      const checkDataSetId = () => {
         const datIdName = suitName + dignityValue;
         return document.getElementById(datIdName)
            ? datIdName + 'double'
            : datIdName;
      };

      const addClass = (classArray, element) => {
         if (classArray.length === 1) {
            element.classList.add(classArray[0]);
         } else {
            element.classList.add(...classArray);
         }
      };

      const addDataAttrs = (objectOfAttrs, element) => {
         for (let key in objectOfAttrs) {
            element.dataset[key] = objectOfAttrs[key];
         }
      };

      const addStyle = (objectOfStyles, element) => {
         for (let key in objectOfStyles) {
            element.dataset[key] = objectOfStyles[key];
         }
      };

      const addId = (element, idValue) => {
         element.id = idValue;
      };

      const addSingleAttrs = (objectOfAttrs, element) => {
         for (let key in objectOfAttrs) {
            element[key] = objectOfAttrs[key];
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
      addDataAttrs({ id: checkDataSetId(), active: true }, cardFront);

      const indexBox = document.createElement('div');
      addClass(['game__card-index-box'], indexBox);

      const dignity = document.createElement('div');
      addClass(['game__card-dignity'], dignity);
      addSingleAttrs({ textContent: dignityValue }, dignity);
      addDataAttrs({ id: checkDataSetId(), active: true }, dignity);

      const suitSmallIcon = document.createElement('img');
      addClass(['game__card-suit'], suitSmallIcon);
      addSingleAttrs({ src: smallIcon }, suitSmallIcon);
      addDataAttrs({ id: checkDataSetId(), active: true }, suitSmallIcon);

      const dignityReverse = document.createElement('div');
      addClass(['game__card-dignity'], dignityReverse);
      addSingleAttrs({ textContent: dignityValue }, dignityReverse);

      const suitSmallIconReverse = document.createElement('img');
      addClass(['game__card-suit'], suitSmallIconReverse);
      addSingleAttrs({ src: smallIcon }, suitSmallIconReverse);

      const suitBigIcon = document.createElement('img');
      addClass(['game__card-suit-big'], suitBigIcon);
      addSingleAttrs({ src: bigIcon }, suitBigIcon);
      addStyle({ width: '29', height: '26' }, suitBigIcon);
      addDataAttrs({ id: checkDataSetId(), active: true }, suitBigIcon);

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

      this.cardField.appendChild(fragment);
   }

   shuffleCards(array) {
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

      cardValues = this.shuffleCards(cardValues);
      cardValues = cardValues.slice(0, numberOfCards);
      cardValues.push(...cardValues);
      cardValues = this.shuffleCards(cardValues);

      cardValues.forEach((card) => {
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
