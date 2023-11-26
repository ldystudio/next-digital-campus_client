import confetti from "canvas-confetti";

// confetti.Promise = new Promise(() => {});
export function colorfulFlag() {
	var scalar = 2;
	var emoji_1 = confetti.shapeFromText({ text: "✨", scalar });
	var emoji_2 = confetti.shapeFromText({ text: "🍬", scalar });
	var emoji_3 = confetti.shapeFromText({ text: "🎉", scalar });

	var defaults = {
		spread: 180,
		particleCount: 30,
		origin: { y: -0.1 },
		startVelocity: -35,
		scalar
	};

	confetti({
		...defaults,
		shapes: [emoji_1]
	}).defaults;
	confetti({
		...defaults,
		shapes: [emoji_2]
	}).defaults;
	confetti({
		...defaults,
		shapes: [emoji_3]
	}).defaults;
}
