export default class GameRender {
   container = document.getElementById('container');
   cardsByDifficulty = {
      1: 3,
      2: 6,
      3: 12,
   };

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
         return document.getElementById(suitName + dignityValue)
            ? suitName + dignityValue + 'double'
            : suitName + dignityValue;
      };

      window.game.cards.push(checkDataSetId());

      const fragment = document.createDocumentFragment();

      const cardWrapper = document.createElement('div');
      cardWrapper.classList.add('game__card-wrapper');
      cardWrapper.dataset.dignity = dignityValue;
      cardWrapper.dataset.suit = suitName;
      cardWrapper.id = checkDataSetId();
      cardWrapper.classList.add('flip');

      setTimeout(() => {
         cardWrapper.classList.remove('flip');
      }, 5000);

      const card = document.createElement('div');
      card.classList.add('game__card');
      card.dataset.id = checkDataSetId();

      const cardBack = document.createElement('div');
      cardBack.classList.add('game__card-back');
      cardBack.dataset.id = checkDataSetId();

      const cardFront = document.createElement('div');
      cardFront.classList.add('game__card-front');
      cardFront.dataset.id = checkDataSetId();
      cardFront.dataset.active = true;

      const indexBox = document.createElement('div');
      indexBox.classList.add('game__card-index-box');

      const dignity = document.createElement('div');
      dignity.classList.add('game__card-dignity');
      dignity.textContent = dignityValue;
      dignity.dataset.id = checkDataSetId();
      dignity.dataset.active = true;

      const suitSmallIcon = document.createElement('img');
      suitSmallIcon.classList.add('game__card-suit');
      suitSmallIcon.src = smallIcon;
      suitSmallIcon.dataset.id = checkDataSetId();
      suitSmallIcon.dataset.active = true;

      const dignityReverse = document.createElement('div');
      dignityReverse.classList.add('game__card-dignity');
      dignityReverse.textContent = dignityValue;

      const suitSmallIconReverse = document.createElement('img');
      suitSmallIconReverse.classList.add('game__card-suit');
      suitSmallIconReverse.src = smallIcon;

      const suitBigIcon = document.createElement('img');
      suitBigIcon.classList.add('game__card-suit-big');
      suitBigIcon.src = bigIcon;
      suitBigIcon.style.width = '29';
      suitBigIcon.style.height = '26';
      suitBigIcon.dataset.id = checkDataSetId();
      suitBigIcon.dataset.active = true;

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

   renderCard() {
      let cardValues = GameRender.templateCard;
      const difficulty = Number(window.game.difficulty);
      const numberOfCards = this.cardsByDifficulty[difficulty];

      function shuffle(array) {
         for (let i = array.length - 1; i > 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i + 1));
            [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
         }
         return array;
      }
      cardValues = shuffle(cardValues);
      cardValues = cardValues.slice(0, numberOfCards);
      cardValues.push(...cardValues);
      cardValues = shuffle(cardValues);

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
