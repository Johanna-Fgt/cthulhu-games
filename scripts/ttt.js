'use strict';

const MSG = {
	win: `You win !`,
	loose: `You loose !`,
	draw: `You're both useless !`,
};
const winningCombos = [
	['0', '1', '2'],
	['3', '4', '5'],
	['6', '7', '8'],
	['0', '3', '6'],
	['1', '4', '7'],
	['2', '5', '8'],
	['0', '4', '8'],
	['2', '4', '6'],
];
const player = {
	img: '../assets/ttt/elders-sign.png',
	score: 0,
};
const computer = {
	img: '../assets/ttt/cthulhu-sign.png',
	score: 0,
};
let cards = ['', '', '', '', '', '', '', '', ''];

window.addEventListener('load', () => {
	const container = document.querySelector('.ttt-game-container');
	createBoard(container);
});

//Create Game board
const createBoard = (container) => {
	for (let i = 0; i < 9; i++) {
		const div = document.createElement('div');
		div.classList.add('adaptive-img-cover');
		div.id = i;
		div.style.backgroundImage = `none`;
		container.append(div);

		div.addEventListener('click', (e) => play(e, player.img, container), {
			once: true,
		});
	}
};

//Play
const play = (e, path, container) => {
	displayCard(e.target, path);
	getPlayerCardId(e);
	setTimeout(() => createComputerCard(container), 100);
	setTimeout(() => checkForWin(), 100);
};
const getRndI = (min, max) => Math.floor(Math.random() * (max - min)) + min;

//Player card
const displayCard = (el, path) =>
	el.style.backgroundImage === 'none'
		? (el.style.backgroundImage = `url(${path})`)
		: (el.style.cursor = 'not-allowed');
const getPlayerCardId = (e) => (cards[e.target.id] = 'X'); //player.cards.push(e.target.id);

//Computer card
const createComputerCard = (container) => {
	let id = getComputerCardId();
	cards[id] = 'O';
	displayCard(container.childNodes[id], computer.img);
	container.childNodes[id].style.pointerEvents = 'none';
	console.log(cards);
};
const getComputerCardId = () => {
	let id = getRndI(0, 9);
	while (cards[id] != '') {
		id = getRndI(0, 9);
	}
	return id;
};

//display score
// const displayScore = () => {
// 	const playerScore = document.getElementById('playerScore');
// 	const computerScore = document.getElementById('computerScore');
// 	playerScore.innerText = `${player.score}`;
// 	computerScore.innerText = `${computer.score}`;
// };

//check for win : à chaque click if combo gagnant, à 5 clicks max possibles on donne loose si pas de combo gagnant
const checkForWin = () => {
	for (let i = 0; i < winningCombos.length; i++) {
		let one = winningCombos[i][0];
		let two = winningCombos[i][1];
		let three = winningCombos[i][2];
		if (
			(cards[one] === 'X' || cards[one] === 'O') &&
			cards[one] === cards[two] &&
			cards[two] === cards[three]
		) {
			if (cards[one] === 'X') {
				displayModal(MSG.win);
				player.score++;
			} else {
				displayModal(MSG.loose);
				computer.score++;
			}
			rebootGame();
		}
	}
};

//reboot
const rebootGame = () => {
	cards = ['', '', '', '', '', '', '', '', ''];
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
		window.location.reload();
	});
};
