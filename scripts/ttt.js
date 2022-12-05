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
	displayScore();
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
	let id = getComputerCardId(container);
	cards[id] = 'O';
	//computer.cards.push(id);
	displayCard(container.childNodes[id], computer.img);
	container.childNodes[id].style.pointerEvents = 'none';
	console.log(cards);
	//console.log(`Cartes joueur : ${player.cards}`);
	//console.log(`Computer : ${computer.cards}`);
};
const getComputerCardId = (container) => {
	let id = getRndI(0, 9);
	while (cards[id] != '') {
		id = getRndI(0, 9);
	}
	return id;
	/*while (
		container.childNodes[id].style.backgroundImage !== 'none' &&
		computer.cards.length < 4
	) {
		id = getRndI(0, 9);
	}
	return id;*/
};

//display result
const displayResult = (el, msg) => (el.innerHTML = `${msg}`);
//display score
const displayScore = () => {
	const playerScore = document.getElementById('playerScore');
	const computerScore = document.getElementById('computerScore');
	playerScore.innerText = `${player.score}`;
	computerScore.innerText = `${computer.score}`;
};

//check for win : à chaque click if combo gagnant, à 5 clicks max possibles on donne loose si pas de combo gagnant
const checkForWin = () => {
	const resultHtml = document.getElementById('tttResult');
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
				alert('win');
				displayResult(resultHtml, MSG.win);
				player.score++;
			} else {
				alert('loose');
				displayResult(resultHtml, MSG.loose);
				computer.score++;
			}
			displayScore();
			rebootGame();
		}
	}
	/*if (player.cards.length > 2) {
		let one;
		let two;
		let three;
		let four;
		let five;
		for (let i = 0; i < winningCombos.length; i++) {
			one = winningCombos[i].includes(`${player.cards[0]}`) ? true : false;
			two = winningCombos[i].includes(`${player.cards[1]}`) ? true : false;
			three = winningCombos[i].includes(`${player.cards[2]}`) ? true : false;
			four = winningCombos[i].includes(`${player.cards[3]}`) ? true : false;
			five = winningCombos[i].includes(`${player.cards[4]}`) ? true : false;
		}

		if (one || two || three || four || five) {
			alert('win');
			displayResult(resultHtml, MSG.win);
			player.score++;
		} else {
			console.log('loose');
			displayResult(resultHtml, MSG.loose);
			computer.score++;
		}
		// rebootGame();
	} else {
		displayResult(resultHtml, MSG.draw);
	}*/
};

//reboot
const rebootGame = () => {
	cards = ['', '', '', '', '', '', '', '', ''];
	window.location.reload();
};

const resetCard = (el) => {
	el.style.backgroundImage = 'none';
};
