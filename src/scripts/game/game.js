import kaboom from "kaboom";
import { loader } from "./levelLoader"

kaboom({
    background: [0,0,0]
})

loadSprite("block", "sprites/tile.png")

loader()



// fetch('/load', {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ "file": "level" })
// })
// .then(response => response.json())
// .then(response => {
//     [...response].forEach((e) => {
//         console.log(e)
//     })
// })