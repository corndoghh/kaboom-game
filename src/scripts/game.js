import kaboom from "kaboom";

kaboom()

loadSprite("block", "sprites/block.png")

const blockPos = {
    x: 3,
    y: 1
}

const size = 1.25


const xMat = (x, y, z) => { return ((x - z) + ((y - z) * -1)) * 64/2 * size}
const yMat = (x, y, z) => { return ((x - z) * 0.5 + (y - z) * 0.5) * 64/2 * size}
// const block = add([
//     sprite("block"),
//     scale(size),
//     pos(xMat(3, 1, 0), yMat(3, 1, 0)),
//     z(1)
// ])
// add([
//     sprite("block"),
//     scale(size),
//     pos(xMat(4, 1, 0), yMat(4, 1, 0)),
//     z(2)
// ])
// add([
//     sprite("block"),
//     scale(size),
//     pos(xMat(4, 2, 0), yMat(4, 2, 0)),
//     z(3)
// ])
// const newBlock = add([
//     sprite("block"),
//     scale(size),
//     pos(xMat(4, 0, 1), yMat(4, 0, 1)),
//     z(3)
// ])

import { Object } from "./classes/object";

new Object("block", {x: 3, y: 0, z: -1}, size)
new Object("block", {x: 4, y: 0, z: -1}, size)
new Object("block", {x: 5, y: 0, z: -1}, size)

new Object("block", {x: 3, y: 0, z: 0}, size)
new Object("block", {x: 4, y: -1, z: 0}, size)
new Object("block", {x: 5, y: 0, z: 0}, size)

new Object("block", {x: 3, y: 0, z: 1}, size)
new Object("block", {x: 4, y: 0, z: 1}, size)
new Object("block", {x: 5, y: 0, z: 1}, size)




// onUpdate(() => {
//     console.log(test.GetSprite.pos + " " + newBlock.pos)
// })

