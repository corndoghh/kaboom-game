import { gui } from "./gui"

export const selectorScreen = async () => {
    const selector = new gui(
        [width() - 40 * 8, height() - 40 * 5],
        [20 * 8, 20 * 5],
        0.5,
        99,
        false,
    )

    const keyPress = new Promise((resolve, reject) => {
        onKeyDown(("v"), () => {
            console.log("x")
            resolve({
                new: false,
                rawBlockData: [{coords: {x: 10, y: 0, z: 10}}]
            })
    
        })
    });

    return keyPress







} 