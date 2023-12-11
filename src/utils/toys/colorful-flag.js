// eslint-disable-next-line @typescript-eslint/no-var-requires
const confetti = require("canvas-confetti").default

export function colorfulFlag() {
    var scalar = 2

    var emoji_1 = confetti.shapeFromText({ text: "✨", scalar })
    var emoji_2 = confetti.shapeFromText({ text: "🍬", scalar })
    var emoji_3 = confetti.shapeFromText({ text: "🎉", scalar })

    var attribute = {
        spread: 180,
        particleCount: 30,
        origin: { y: 0 },
        startVelocity: -30,
        scalar
    }

    confetti({
        ...attribute,
        shapes: [emoji_1]
    })
    confetti({
        ...attribute,
        shapes: [emoji_2]
    })
    confetti({
        ...attribute,
        shapes: [emoji_3]
    })
}
