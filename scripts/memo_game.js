'use strict';

let cardArray = [];
const CARDS_EASY = [
	{
		name: `monster0`,
		img: `/assets/memo_game/yog-sothoth.png`,
	},
	{
		name: `monster0`,
		img: `/assets/memo_game/yog-sothoth.png`,
	},
	{
		name: `monster1`,
		img: `/assets/memo_game/yithian.png`,
	},
	{
		name: `monster1`,
		img: `/assets/memo_game/yithian.png`,
	},
	{
		name: `monster2`,
		img: `/assets/memo_game/cthulhu.png`,
	},
	{
		name: `monster2`,
		img: `/assets/memo_game/cthulhu.png`,
	},
	{
		name: `monster3`,
		img: `/assets/memo_game/dagon.png`,
	},
	{
		name: `monster3`,
		img: `/assets/memo_game/dagon.png`,
	},
	{
		name: `monster4`,
		img: `/assets/memo_game/people-of-innsmouth.png`,
	},
	{
		name: `monster4`,
		img: `/assets/memo_game/people-of-innsmouth.png`,
	},
	{
		name: `monster5`,
		img: `/assets/memo_game/black-goat.png`,
	},
	{
		name: `monster5`,
		img: `/assets/memo_game/black-goat.png`,
	},
];
const CARDS_MEDIUM = [
	{
		name: `monster6`,
		img: `/assets/memo_game/azathoth.png`,
	},
	{
		name: `monster6`,
		img: `/assets/memo_game/azathoth.png`,
	},
	{
		name: `monster7`,
		img: `/assets/memo_game/deep-ones.png`,
	},
	{
		name: `monster7`,
		img: `/assets/memo_game/deep-ones.png`,
	},
	{
		name: `monster8`,
		img: `/assets/memo_game/mi-go.png`,
	},
	{
		name: `monster8`,
		img: `/assets/memo_game/mi-go.png`,
	},
];
const CARDS_HARD = [
	{
		name: `monster9`,
		img: `/assets/memo_game/shoggoth.png`,
	},
	{
		name: `monster9`,
		img: `/assets/memo_game/shoggoth.png`,
	},
	{
		name: `monster10`,
		img: `/assets/memo_game/tsathoggua.png`,
	},
	{
		name: `monster10`,
		img: `/assets/memo_game/tsathoggua.png`,
	},
	{
		name: `monster11`,
		img: `/assets/memo_game/king-in-yellow.png`,
	},
	{
		name: `monster11`,
		img: `/assets/memo_game/king-in-yellow.png`,
	},
];
const chosenCards = {
	name: [],
	id: [],
	won: [],
};

window.addEventListener('load', () => {
	const btnLevelMenu = document.getElementById('btnLevelMenu');
	const inputEasy = document.getElementById('easy');
	const inputMedium = document.getElementById('medium');
	const inputHard = document.getElementById('hard');
	const gridHtml = document.querySelector('.grid');

	const levelMenu = document.getElementById('levelMenu');

	createBoard(gridHtml);

	const handleLevelMenu = (e) => {
		let targetEl = e.target.parentNode.parentNode.parentNode;
		if (targetEl !== btnLevelMenu) levelMenu.classList.add('hide-menu');
	};

	btnLevelMenu.addEventListener('click', displayMenu);
	document.addEventListener('click', handleLevelMenu);
	inputEasy.addEventListener('click', () => getEasy(gridHtml));
	inputMedium.addEventListener('click', () => getHard(gridHtml));
	inputHard.addEventListener('click', () => getHarder(gridHtml));
});

//Levels
const displayMenu = () => {
	const levelMenu = document.getElementById('levelMenu');
	levelMenu.classList.toggle('hide-menu');
};

//Gameboard
const createBoard = (gridHtml) => {
	fillArray(CARDS_EASY);
	resizeGrid(gridHtml);
	randomize();
	createGrid(gridHtml);
};
const fillArray = (arrayToPush) => {
	for (let i = 0; i < arrayToPush.length; i++) {
		cardArray.push(arrayToPush[i]);
	}
};
const resizeGrid = (grid) => {
	if (cardArray.length !== 8) {
		grid.style.minWidth = '100%';
		grid.style.maxWidth = '100%';
		grid.style.height = '100%';
	} else {
		grid.style.maxWidth = '620px';
		grid.style.minWidth = '300px';
		grid.style.minHeight = '100%';
	}
};
const randomize = () => cardArray.sort(() => 0.5 - Math.random());
const createCard = (i) => {
	let card = new Image();
	card.src = '/assets/memo_game/back.png';
	card.id = i;
	return card;
};
const createGrid = (grid) => {
	for (let i = 0; i < cardArray.length; i++) {
		//create a card
		let card = createCard(i);
		//flip it on click
		card.addEventListener('click', (e) => flipcard(e, grid));
		//give it a parent element
		let div = document.createElement('div');
		div.classList.add('adaptive-img-contain');
		grid.appendChild(div);
		let span = document.createElement('span');
		div.appendChild(span);
		span.appendChild(card);
	}
};

//flip a card
const flipcard = (e, gridHtml) => {
	let cardImg = e.target.attributes.src.value;
	let cardId = e.target.attributes.id.value;
	//flip the cards only if not already in cardsWon
	if (cardImg === '/assets/memo_game/back.png') {
		//store the chosen card id / name
		chosenCards.id.push(cardId);
		chosenCards.name.push(cardArray[cardId].name);
		//display the chosen card image
		e.target.attributes.src.value = cardArray[cardId].img;
		//check for match if 2 cards have been chosen
		if (chosenCards.name.length === 2) {
			setTimeout(() => checkForMatch(gridHtml), 600);
		}
	}
};

//Remove gameboard
const removeGrid = () => {
	for (let i = 0; i < cardArray.length; i++) {
		document.querySelector('.adaptive-img-contain').remove();
	}
};
const removeBoard = () => {
	removeGrid();
	cardArray = [];
};

//flip cards
const makeDisappear = (card) =>
	(card.src = '/assets/memo_game/disappeared.png');
const flipBack = (card) => (card.src = '/assets/memo_game/back.png');

//EndGame
const checkForMatch = (gridHtml) => {
	const resultHtml = document.getElementById('result');
	let cards = gridHtml.querySelectorAll('img');

	//check for matches (compare names && cards Id to prevent double click on the same card)
	if (
		chosenCards.name[0] === chosenCards.name[1] &&
		chosenCards.id[0] !== chosenCards.id[1]
	) {
		//replace chosen cards so they disappear
		makeDisappear(cards[chosenCards.id[0]]);
		makeDisappear(cards[chosenCards.id[1]]);
		//register the chosen cards
		chosenCards.won.push(chosenCards.name);
		console.log(chosenCards.won);
	} else {
		//flip back the chosen cards
		flipBack(cards[chosenCards.id[0]]);
		flipBack(cards[chosenCards.id[1]]);
	}
	//empty the arrays for fresh start
	chosenCards.name = [];
	chosenCards.id = [];
	//print the result
	resultHtml.textContent = chosenCards.won.length;
	//check if the game is won
	checkIfWon(resultHtml, gridHtml);
};
const checkIfWon = (resultHtml, gridHtml) => {
	if (chosenCards.won.length === cardArray.length / 2) {
		//print the winning message
		displayModal('You win !');
		//Clear for fresh start
		chosenCards.won = [];
		resultHtml.textContent = chosenCards.won.length;
		//create new board depending on actual selected level
		if (cardArray.length === 12) {
			getEasy(gridHtml);
		} else if (cardArray.length === 18) {
			getHard(gridHtml);
		} else {
			getHarder(gridHtml);
		}
		displayMenu();
	}
};
//Popup
const displayModal = (msg) => {
	const modal = document.getElementById('modal');
	const canvas = document.getElementById('matrix');
	modal.innerHTML = `${msg} <span>Click anywhere to escape.</span>`;
	modal.style.display = 'block';
	canvas.style.display = 'block';
	window.addEventListener('click', () => {
		canvas.style.display = 'none';
		modal.style.display = 'none';
	});
};
//Levels
const getEasy = (gridHtml) => {
	removeBoard();
	createBoard(gridHtml);
	displayMenu();
};
const getHard = (gridHtml) => {
	removeBoard();
	fillArray(CARDS_MEDIUM);
	createBoard(gridHtml);
	displayMenu();
};
const getHarder = (gridHtml) => {
	removeBoard();
	fillArray(CARDS_MEDIUM);
	fillArray(CARDS_HARD);
	createBoard(gridHtml);
	displayMenu();
};
