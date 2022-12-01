import { gui } from "./gui"
import * as exports from "../game/classes/functions"  
Object.entries(exports).forEach(([funName, exported]) => window[funName] = exported);

export const selectorScreen = async () => {
    document.title = "Level selector"

    const selector = new gui(
        [width() - 40 * 8, height() - 40 * 5],
        [20 * 8, 20 * 5],
        0.5,
        99,
        false,
    )

    selector.addObj(text("Level Selector"), [50,-7], 1, () => console.log("bob"), true)
    
    selector.addObj(text("New", {font: "sink", size: 48}), [50,90], 1, async () => {
        const text = await input();
        console.log(text)
    }, true)


        
    const keyPress = await new Promise((resolve, _reject) => {
        onKeyDown(("v"), () => {
            resolve({
                new: false,
                session: "x",
                rawBlockData: [{coords: {x: 10, y: 0, z: 10}}]
            })
        })
    })

    selector.remove();


    
    return keyPress







} 