'use strict';
const CARDS = [
	{
		path: '../assets/ttt/elders-sign.png',
	},
	{
		path: '../assets/ttt/cthulhu-sign.png',
	},
];
// let cards = [];
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
let playerTotalScore = 0;
let computerTotalScore = 0;

addEventListener('load', () => {
	const playerScore = document.getElementById('playerScore');
	const computerScore = document.getElementById('computerScore');
	const tttResult = document.getElementById('tttResult');
	const container = document.querySelector('.ttt-game-container');

	//Create Game board
	const createEl = (i) => {
		const div = document.createElement('div');
		div.classList.add('adaptive-img-cover');
		div.setAttribute('id', i);
		// cards.push(div.id)
		div.style.backgroundImage = `none`;
		container.append(div);
		div.addEventListener('click', (e) => playerPlays(e, CARDS[0].path), {
			once: true,
		});
		return div;
	};
	const createBoard = () => {
		for (let i = 0; i < 9; i++) {
			createEl(i);
		}
	};
	createBoard();

	//display player card
	const displayCard = (el, path) =>
		el.style.backgroundImage === 'none'
			? (el.style.backgroundImage = `url(${path})`)
			: (el.style.cursor = `not-allowed`);

	//get player card id
	let playerCards = [];
	let availableCards = [];
	let computerCards = [];
	let randomId;
	let isAvailable;

	// const getPlayerCardId = (e) => e.target.style.backgroundImage === 'none' ? playerCards.push(e.target.id) : e.target.style.cursor = `not-allowed`;
	const getPlayerCardId = (e) => playerCards.push(e.target.id);

	// document.addEventListener('mouseup', (e) => preventUnauthorizedClick);
	// const preventUnauthorizedClick = (e) => {
	//     if(e.target.style.backgroundImage === 'none') {
	//         e.target.style.pointerEvents = `none`
	//     }
	// }

	//Player turn actions
	const playerPlays = (e, path) => {
		displayCard(e.target, path);
		getPlayerCardId(e);
		setTimeout(createComputerCard, 1000);
		checkForWin();
	};

	const getRndI = (min, max) => Math.floor(Math.random() * (max - min)) + min;

	//display computer card
	// Verify availables cards
	// const checkAvailable = (e) => availableCards = cards.filter((card) => card !== e.target.id);

	// const checkAvailable = (randomId) => {
	//     console.log(randomId);
	//     // for(let i = 0; i < playerCards.length; i ++) {
	//         // playerCards[i] !== randomId && computerCards[i] !== randomId ?
	//         // computerCards.push(cards[randomId]) : randomId = getRndI(0, maxLength);
	//         // console.log(playerCards[i])
	//         console.log(playerCards)
	//         if(playerCards.includes(`${randomId}`)) {
	//             console.log('carte déjà jouée par player');
	//             return isAvailable = false;
	//         }
	//         if(computerCards.includes(randomId)) {
	//             console.log('carte déjà jouée par computer');
	//             return isAvailable = false;
	//         } else {
	//             isAvailable = true;
	//         };
	//     // }
	// }
	const checkAvailable = () =>
		(isAvailable =
			container.childNodes[randomId].style.backgroundImage === 'none'
				? true
				: false);

	const getComputerCardId = () => {
		randomId = getRndI(0, 9);
		// if(!isAvailable) {
		//     randomId = getRndI(0, 9);
		//     checkAvailable(randomId);
		// } else {

		//     computerCards.push(randomId);
		//     displayCard(container.childNodes[randomId], CARDS[1].path);
		// }

		// if(isAvailable) {
		//     computerCards.push(randomId);
		//     displayCard(container.childNodes[randomId], CARDS[1].path);
		// } else if(!isAvailable) {
		//     getComputerCardId();
		//     // randomId = getRndI(0, 9);
		// //     checkAvailable(randomId);

		// }
		// if(!playerCards.includes(computerCards[i]) && !computerCards.  includes(computerCards[i])) {
		//     displayCard(container.childNodes[i], CARDS[1].path);
		//     computerCards.push(cards[i]);
		// } else if(computerCards.includes(computerCards[i])){
		//     i = getRndI(0, maxLength);
		//     console.log(i)
		// }else if(playerCards.includes(computerCards[i])){
		//     i = getRndI(0, maxLength);
		//     console.log(i)
		// }
		// while(computerCards.includes(computerCards[i]) || playerCards.includes(computerCards[i])){
		//     i = getRndI(0, maxLength);
		// }

		// computerCards.push(cards[randomId])

		// console.log(`Computer : ${computerCards}`);
	};
	const createComputerCard = () => {
		getComputerCardId();
		checkAvailable();
		console.log(isAvailable);
		// if(isAvailable) {
		//     computerCards.push(randomId);
		//     displayCard(container.childNodes[randomId], CARDS[1].path);
		// } else if(!isAvailable) {
		//     getComputerCardId();
		//     checkAvailable();
		// }
		while (!isAvailable && computerCards.length < 4) {
			getComputerCardId();
			checkAvailable();
		}
		computerCards.push(randomId);
		displayCard(container.childNodes[randomId], CARDS[1].path);
		container.childNodes[randomId].style.pointerEvents = 'none';
		console.log(`Cartes joueur : ${playerCards}`);
		console.log(`Computer : ${computerCards}`);
		return;
	};

	//check for win : à chaque click if combo gagnant, à 5 clicks max possibles on donne loose si pas de combo gagnant
	const checkForWin = () => {
		if (playerCards.length > 2) {
			for (let i = 0; i < winningCombos.length; i++) {
				let one = winningCombos[i].includes(`${playerCards[0]}`) ? true : false;
				let two = winningCombos[i].includes(`${playerCards[1]}`) ? true : false;
				let three = winningCombos[i].includes(`${playerCards[2]}`)
					? true
					: false;

				if (one && two && three) {
					alert('win');
					displayResult(tttResult, `You win !`);
					playerTotalScore++;
				} else {
					console.log('loose');
					displayResult(tttResult, `You Loose !`);
					computerTotalScore++;
				}
			}
			rebootGame();
		} else {
			console.log(playerCards.length);
			displayResult(tttResult, `You're both useless !`);
		}
		displayScore();
	};

	//display result
	const displayResult = (el, msg) => (el.innerHTML = `${msg}`);

	//display score
	const displayScore = () => {
		playerScore.innerText = `${playerTotalScore}`;
		computerScore.innerText = `${computerTotalScore}`;
	};

	//reboot
	const rebootGame = () => {
		playerCards = [];
		computerCards = [];
	};

	const resetCard = (el) => {
		el.style.backgroundImage = 'none';
	};
});
