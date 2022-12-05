'use strict';
const ANSWERS = [
	'It is certain',
	'It is decidedly so',
	'Reply hazy try again',
	'Cannot predict now',
	'Do not count on it',
	'My sources say no',
	'Outlook not so good',
	'Signs point to yes',
];

window.addEventListener('load', () => {
	const ball = document.getElementById('ball');
	const answerHtml = document.getElementById('answer');
	const askBtn = document.getElementById('ask');

	askBtn.addEventListener('click', () => ask(ball, answerHtml, askBtn));
});

const ask = (ball, answerHtml, askBtn) => {
	ball.classList.toggle('shaking');

	answerHtml.innerText = ` `;
	askBtn.innerText = `Ask`;

	if (ball.className) setTimeout(() => displayMsg(answerHtml, askBtn), 2000);
};

const displayMsg = (answerHtml, askBtn) => {
	answerHtml.innerHTML = `${ANSWERS[Math.floor(Math.random() * 8)]}`;
	askBtn.innerHTML = `<div class='adaptive-img-cover'><span><img src='../assets/icons/refresh.png' alt='Logo refresh'></span></div>`;
};
