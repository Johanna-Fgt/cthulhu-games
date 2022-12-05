'use strict';
const CANVAS_SIZE = {
	width: 600,
	height: 400,
};
const CANVAS = {
	top: 0,
	left: 0,
	right: CANVAS_SIZE.width,
	bottom: CANVAS_SIZE.height,
};
const BALL = {
	color: '#00B489',
	radius: 10,
	x: CANVAS_SIZE.width / 2,
	y: (CANVAS_SIZE.height * 4) / 5,
};
const SPEED = {
	dx: 1, //pixels per frame
	dy: 1,
	stop: 0,
	start: 1,
};
const RACKET = {
	color: 'aliceblue',
	width: 80,
	height: 10,
	x: CANVAS_SIZE.width / 2 - 40,
	y: CANVAS_SIZE.height - 20,
};
const TEXT = {
	font: '12px Poppins',
	color: 'aliceblue',
	space: 10,
};
const BRICK = {
	color: 'rgba(32,38,57,1)',
	color2: '#00b48a6e',
	height: 20,
	width: 60,
	gap: 22,
};
const BATCH_OF_BRICKS = {
	col: Math.floor((CANVAS_SIZE.width - BRICK.gap) / (BRICK.width + BRICK.gap)),
	row: 4,
};
const numberOfBricks = BATCH_OF_BRICKS.col * BATCH_OF_BRICKS.row;
const bricks = [];
let lifes = 3;
let score = 0;
let started = false;
let rightPressed = false;
let leftPressed = false;

const main = () => {
	const canvasDom = document.getElementById('canvas');
	const ctx = canvasDom.getContext('2d');
	const img = new Image();

	//detect when img loaded, to be defined before img.src is set
	img.addEventListener('load', () => console.log('Loaded image!'));
	// img.onload = () => console.log('Loaded image!');
	img.src = '../assets/icons/monster.png';

	drawCanvas(canvasDom);
	createBrickBatch();
	displayEl(ctx, img);

	//Smooth event (prevent keydown delay by erasing the keyup effect)
	const handleKeyDown = (e) => {
		e.preventDefault();
		if (e.key === 'ArrowRight') rightPressed = true;
		if (e.key === 'ArrowLeft') leftPressed = true;
		if (e.key === ' ' && !started) {
			started = !started;
			SPEED.dx = SPEED.stop;
			bouncingBall(ctx, SPEED.dx, SPEED.dy, img);
		}
	};
	const handleKeyUp = (e) => {
		if (e.key === 'ArrowRight') rightPressed = false;
		if (e.key === 'ArrowLeft') leftPressed = false;
	};
	addEventListener('keydown', handleKeyDown);
	addEventListener('keyup', handleKeyUp);
};
const cleanItAll = (ctx) =>
	ctx.clearRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);
const drawCanvas = (canvas) => {
	canvas.width = CANVAS_SIZE.width;
	canvas.height = CANVAS_SIZE.height;
};
const drawBordersCanvas = (ctx) => {
	ctx.strokeStyle = 'aliceblue';
	ctx.strokeRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);
};
const displayScore = (ctx) => {
	ctx.font = TEXT.font;
	ctx.fillStyle = TEXT.color;
	ctx.fillText('Score :', 10, 20);
	ctx.fillText(` ${score}`, ctx.measureText('Score :').width + TEXT.space, 20);
};
const displayLifes = (ctx) => {
	ctx.font = TEXT.font;
	ctx.fillStyle = TEXT.color;
	ctx.fillText(
		'Lifes :',
		CANVAS_SIZE.width -
			ctx.measureText('Lifes :').width -
			ctx.measureText(`${lifes}`).width -
			TEXT.space * 2,
		20
	);
	ctx.fillText(
		` ${lifes}`,
		CANVAS_SIZE.width - ctx.measureText('Lifes :').width + TEXT.space,
		20
	);
};
const displayBricks = (ctx) => {
	for (let row = 0; row < BATCH_OF_BRICKS.row; row++) {
		for (let col = 0; col < BATCH_OF_BRICKS.col; col++) {
			let brick = bricks[row][col];
			if (brick.lifes === 2) {
				ctx.fillStyle = BRICK.color;
				ctx.fillRect(brick.x, brick.y, BRICK.width, BRICK.height);
			} else if (brick.lifes === 1) {
				ctx.fillStyle = BRICK.color2;
				ctx.fillRect(brick.x, brick.y, BRICK.width, BRICK.height);
			}
		}
	}
};
const createBrickBatch = () => {
	for (let row = 0; row < BATCH_OF_BRICKS.row; row++) {
		bricks[row] = [];
		for (let col = 0; col < BATCH_OF_BRICKS.col; col++) {
			bricks[row][col] = {
				x: BRICK.gap + (BRICK.width + BRICK.gap) * col,
				y: BRICK.gap + 10 + (BRICK.height + 10) * row,
				lifes: 2,
			};
		}
	}
};
const displayBall = (ctx, img) => {
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = BRICK.color;
	ctx.strokeStyle = BALL.color;
	ctx.arc(BALL.x, BALL.y, BALL.radius, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.fill();
	ctx.clip();
	ctx.drawImage(
		img,
		BALL.x - BALL.radius,
		BALL.y - BALL.radius,
		BALL.radius * 2,
		BALL.radius * 2
	);
	ctx.restore();
};
const displayRacket = (ctx) => {
	ctx.beginPath();
	ctx.fillStyle = RACKET.color;
	ctx.roundRect(RACKET.x, RACKET.y, RACKET.width, RACKET.height, RACKET.height);
	ctx.fill();
};
const displayEl = (ctx, img) => {
	cleanItAll(ctx);
	drawBordersCanvas(ctx);
	displayBall(ctx, img);
	displayRacket(ctx);
	displayBricks(ctx);
	displayScore(ctx);
	displayLifes(ctx);
};
const moveRacket = (dx) => {
	if (rightPressed && RACKET.x + RACKET.width < CANVAS_SIZE.width)
		RACKET.x += dx;
	if (leftPressed && RACKET.x > 0) RACKET.x -= dx;
};
const bouncingBall = (ctx, dx, dy, img) => {
	const BALL_BORDER = {
		left: BALL.x - BALL.radius,
		right: BALL.x + BALL.radius,
		bottom: BALL.y + BALL.radius,
		top: BALL.y - BALL.radius,
	};
	const RACKET_PARTS = {
		left: RACKET.x,
		middle: RACKET.x + RACKET.width / 3,
		right: RACKET.x + (RACKET.width * 2) / 3,
	};
	const racketLength = RACKET.x + RACKET.width;

	SPEED.dx = SPEED.start;
	displayEl(ctx, img);
	moveRacket(SPEED.dx * 2);

	let updatedDx = handleCollisionX(
		BALL_BORDER.bottom,
		BALL_BORDER.left,
		BALL_BORDER.right,
		RACKET_PARTS.left,
		RACKET_PARTS.middle,
		RACKET_PARTS.right,
		racketLength,
		dx
	);

	let updatedDy = handleCollisionY(
		BALL_BORDER.bottom,
		BALL_BORDER.top,
		BALL_BORDER.right,
		BALL_BORDER.left,
		RACKET_PARTS.left,
		racketLength,
		dy
	);

	//handleBrickCollision
	for (let row = 0; row < BATCH_OF_BRICKS.row; row++) {
		for (let col = 0; col < BATCH_OF_BRICKS.col; col++) {
			let brick = bricks[row][col];
			if (brick.lifes > 0) {
				if (
					BALL_BORDER.right >= brick.x &&
					BALL_BORDER.left <= brick.x + BRICK.width &&
					BALL_BORDER.bottom >= brick.y &&
					BALL_BORDER.top <= brick.y + BRICK.height
				) {
					updatedDx = handleBrickCollisionX(
						BALL_BORDER.right,
						BALL_BORDER.left,
						brick,
						updatedDx
					);
					updatedDy = handleBrickCollisionY(
						BALL_BORDER.bottom,
						BALL_BORDER.top,
						brick,
						updatedDy
					);
					brick.lifes--;
					if (brick.lifes === 0) score++;
				}
			}
		}
	}

	BALL.x += updatedDx;
	BALL.y += updatedDy;

	looseLife(BALL_BORDER.bottom);
	loose();
	win(numberOfBricks);

	//START OR END GAME
	if (started && lifes)
		requestAnimationFrame(() => bouncingBall(ctx, updatedDx, updatedDy, img));
};

const handleCollisionY = (
	ballBottom,
	ballTop,
	ballRight,
	ballLeft,
	racketLeft,
	racketLength,
	dy
) => {
	dy = handleCanvasCollisionY(ballBottom, ballTop, dy);
	dy = handleRacketCollisionY(
		ballBottom,
		ballRight,
		ballLeft,
		racketLeft,
		racketLength,
		dy
	);
	return dy;
};
const handleCollisionX = (
	ballBottom,
	ballLeft,
	ballRight,
	racketLeft,
	racketMiddle,
	racketRight,
	racketLength,
	dx
) => {
	dx = handleCanvasCollisionX(ballRight, ballLeft, dx);
	dx = handleRacketCollisionX(
		ballBottom,
		ballRight,
		ballLeft,
		racketLeft,
		racketMiddle,
		racketRight,
		racketLength,
		dx
	);
	return dx;
};

//ball / left or right wall collision
const handleCanvasCollisionX = (ballRight, ballLeft, dx) =>
	(dx = ballRight > CANVAS.right || ballLeft < CANVAS.left ? -dx : dx);
//ball / bottom or top of canvas collision
const handleCanvasCollisionY = (ballBottom, ballTop, dy) =>
	(dy = ballBottom === CANVAS.bottom || ballTop === CANVAS.top ? -dy : dy);

//ball / racket collision
const handleRacketCollisionY = (
	ballBottom,
	ballRight,
	ballLeft,
	racketLeft,
	racketLength,
	dy
) =>
	(dy =
		ballBottom === RACKET.y &&
		ballRight >= racketLeft &&
		ballLeft <= racketLength
			? -dy
			: dy);
const handleRacketCollisionX = (
	ballBottom,
	ballRight,
	ballLeft,
	racketLeft,
	racketMiddle,
	racketRight,
	racketLength,
	dx
) => {
	if (ballBottom === RACKET.y)
		dx =
			BALL.x > racketMiddle && BALL.x < racketRight
				? 0
				: ballRight >= racketLeft && BALL.x <= racketMiddle
				? -1
				: BALL.x >= racketRight && ballLeft <= racketLength
				? 1
				: dx;
	return dx;
};

//Ball / brick collision
const handleBrickCollisionX = (ballRight, ballLeft, brick, dx) =>
	(dx = ballRight === brick.x || ballLeft === brick.x + BRICK.width ? -dx : dx);
const handleBrickCollisionY = (ballBottom, ballTop, brick, dy) =>
	(dy =
		ballBottom === brick.y || ballTop === brick.y + BRICK.height ? -dy : dy);

const looseLife = (ballBottom) =>
	(lifes = ballBottom === CANVAS.bottom ? (lifes -= 1) : lifes);
const loose = () => {
	if (!lifes) {
		displayModal('You loose !');
	}
};
const win = (numberOfBricks) => {
	if (score === numberOfBricks) {
		started = !started;
		displayModal('You win !');
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
		window.location.reload();
	});
};
addEventListener('load', main);
