'use strict';
//manage symbols effect
class Symbol {
	constructor(x, y, fontSize, canvasHeight) {
		this.characters =
			'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		this.x = x;
		this.y = y;
		this.fontSize = fontSize;
		this.text = ''; //current active symbol
		this.canvasHeight = canvasHeight;
	}
	draw(context) {
		this.text = this.characters.charAt(
			Math.floor(Math.random() * this.characters.length)
		);

		context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);

		this.y =
			this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98
				? 0
				: (this.y += 1);
	}
}
//Manage entire effect
class Effect {
	constructor(canvasWidth, canvasHeight) {
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.fontSize = 25;
		this.columns = this.canvasWidth / this.fontSize;
		this.symbols = [];
		this.#initialize();
	}
	//Private method starts with # and can't be called from outside
	#initialize() {
		for (let i = 0; i < this.columns; i++) {
			this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
		}
	}
}

addEventListener('load', () => {
	const canvas = document.getElementById('matrix');
	const ctx = canvas.getContext('2d');

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const gradient = createGradient(ctx, canvas.width, canvas.height);
	const effect = new Effect(canvas.width, canvas.height);

	animateMatrix(ctx, canvas.width, canvas.height, gradient, effect);

	window.addEventListener('resize', () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	});
});
const animateMatrix = (ctx, width, height, gradient, effect) => {
	drawMatrixCanvas(ctx, width, height);
	drawSymbols(ctx, gradient, effect);
	setTimeout(
		() =>
			requestAnimationFrame(() =>
				animateMatrix(ctx, width, height, gradient, effect)
			),
		1000 / 30
	);
};
const drawMatrixCanvas = (ctx, width, height) => {
	ctx.fillStyle = 'rgba(0,0,0,0.05)';
	ctx.textAlign = 'center';
	ctx.fillRect(0, 0, width, height);
};
const drawSymbols = (ctx, gradient, effect) => {
	ctx.fillStyle = gradient;
	ctx.font = effect.fontSize + 'px monospace';
	effect.symbols.forEach((symbol) => symbol.draw(ctx));
};
const createGradient = (ctx, width, height) => {
	let gradient = ctx.createLinearGradient(0, 0, width, height);
	gradient.addColorStop(0, '#00b48ae2');
	gradient.addColorStop(0.6, '#f0f8ff');
	gradient.addColorStop(1, 'red');
	return gradient;
};
