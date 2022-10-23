import kaboom from "kaboom";

kaboom()

loadSprite("block", "sprites/block.png")

const blockPos = {
    x: 3,
    y: 1
}

const size = 2.5


const xMat = (x, y, w) => { return (x + (y * -1)) * w/2 * size}
const yMat = (x, y, h) => { return (x * 0.5 + y * 0.5) * h/2 * size}



const block = add([
    sprite("block"),
    scale(size),
    pos(xMat(3, 1, 64), yMat(3, 1, 64)),
    z(1)
])

add([
    sprite("block"),
    scale(size),
    pos(xMat(4, 1, 64), yMat(4, 1, 64)),
    z(2)

])

add([
    sprite("block"),
    scale(size),
    pos(xMat(4, 2, 64), yMat(4, 2, 64)),
    z(3)

])

add([
    sprite("block"),
    scale(size),
    pos(xMat(4, 0, 64), yMat(4, 0, 64)),
    z(4)
])

onUpdate(() => {
    console.log(block.pos + " " + block.height)
})
