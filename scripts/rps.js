'use strict';
const CARDS = [
	{
		id: 'rock',
		src: '../assets/rps/rock.png',
	},
	{
		id: 'paper',
		src: '../assets/rps/paper.png',
	},
	{
		id: 'scissors',
		src: '../assets/rps/scissors.png',
	},
];
const BACK_CARDS = {
	cthulhu: '/assets/rps/white_cthulhu.png',
	disappear: '/assets/memo_game/disappeared.png',
};
const MSG = {
	draw: `It's a draw`,
	win: `You win !`,
	loose: `You loose !`,
};
const player = {
	selectedCard: null,
	printedCard: null,
	score: 0,
};
const computer = {
	selectedCard: null,
	printedCard: null,
	score: 0,
};

window.addEventListener('load', () => {
	const rock = document.getElementById('rock');
	const paper = document.getElementById('paper');
	const scissors = document.getElementById('scissors');
	const playerCardBoard = document.getElementById('playerCardBoard');
	const computerCardBoard = document.getElementById('computerCardBoard');
	const rpsResult = document.getElementById('rpsResult');

	//Create player's and computer's card
	player.printedCard = createCard(
		player.printedCard,
		BACK_CARDS.disappear,
		playerCardBoard
	);
	computer.printedCard = createCard(
		computer.printedCard,
		BACK_CARDS.cthulhu,
		computerCardBoard
	);

	const play = (e) => {
		if (!player.selectedCard) {
			selectCard(e);
			displayMatch();
			checkforWinner(rpsResult);
			displayScore();
			setTimeout(() => reboot(rpsResult), 2000);
		}
	};

	rock.addEventListener('click', play);
	paper.addEventListener('click', play);
	scissors.addEventListener('click', play);
});

const createCard = (card, path, cardboard) => {
	card = new Image();
	card.src = path;
	cardboard.append(card);
	return card;
};

const selectCard = (e) => {
	player.selectedCard = e.target;
	computer.selectedCard = CARDS[Math.floor(Math.random() * 3)];
};

const displayMatch = () => {
	player.printedCard.src = player.selectedCard.src;
	computer.printedCard.src = computer.selectedCard.src;
};

const checkforWinner = (rpsResult) => {
	let pId = player.selectedCard.id;
	let cId = computer.selectedCard.id;
	if (pId === cId) {
		rpsResult.innerHTML = MSG.draw;
	} else if (
		(pId === `rock` && cId === `scissors`) ||
		(pId === `scissors` && cId === `paper`) ||
		(pId === `paper` && cId === `rock`)
	) {
		rpsResult.innerHTML = MSG.win;
		player.score++;
	} else {
		rpsResult.innerHTML = MSG.loose;
		computer.score++;
	}
};

const displayScore = () => {
	const playerScore = document.getElementById('playerScore');
	const computerScore = document.getElementById('computerScore');
	playerScore.innerHTML = `${player.score}`;
	computerScore.innerHTML = `${computer.score}`;
};

const reboot = (el) => {
	player.printedCard.src = BACK_CARDS.disappear;
	computer.printedCard.src = BACK_CARDS.cthulhu;
	player.selectedCard = null;
	el.innerHTML = ``;
};
