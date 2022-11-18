import { block } from "./classes/object"
import { Vec3 } from "./classes/vec3"
export const loader = async () => {
    const response = await fetch("/levels/level.json")
    const data = await response.json();
    loadSprite("static", "/levels/image.png");

    // const response = await fetch('/load', {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ "file": "level" })
    // })

    // const data = await response.json();
    // console.log(data);

    [...data].forEach((e) => {
        new block(e.image, new Vec3(e.pos.x, e.pos.y, e.pos.z))
    })


    wait(0.1, () => {
        const staticImage = add([
            sprite("static")
        ])
    })
}

// const data = fetch('/load', {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ "file": "level" })
// }).then(response => {
//     if (response.ok) {
//         return response.json()
//     }
//     return Promise.reject(Error("error"))
// }).catch(error => {return Promise.reject(Error(error.message))})

// data.then((e) => {
//     [...e.body].forEach((e) => {
//         new block(e.image, e.pos)
//     })
// })

