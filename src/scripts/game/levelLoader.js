import { block } from "./classes/object"
export const loader = async () => {
    const response = await fetch('/load', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "file": "level" })
    })

    const data = await response.json();

    [...data.body].forEach((e) => {
        new block(e.image, e.pos)
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

