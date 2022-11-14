import kaboom from "kaboom";
import { loader } from "./levelLoader"
import { loadAssets } from "./loadAssets"

kaboom({
    background: [0,0,0]
})

loadAssets()

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