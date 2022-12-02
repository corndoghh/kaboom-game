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
        color(89, 90, 95),
    )

    selector.addObj(text("Level Selector", {font: "sink", size: 72}), [50,-7], 1, () => console.log(""), true)

    selector.addLayer("levelSelect", [96, 80], [2, 3], outline(1, [0,0,0]))
    


        
    const keyPress = await new Promise( async (resolve, _reject) => {
    
        selector.addObj(text("New", {font: "sink", size: 48}), [50,90], 1, async () => {
            const textResult = await boxInput(text("hello", {font: "sink"}), text("New level"), [0,0,0,0.9], true);
            resolve({
                new: true,
                session: textResult
            })
        }, true)

        const data = (await (await fetch("/getLevels")).json()).levels

        data.forEach(async (x, i) => {
            await loadSprite(x+"-Sprite", `/levels/${x}/image.png`)
            const obj = add([
                sprite(x+"-Sprite"),
                scale(0.2),
                pos((100/data.length*0.5) * (2*i) + 15, 20),
                origin("center"),
                z(105),
            ])
            console.log(obj.pos)
            selector.addObjFull(obj, () => console.log("cool"), "levelSelect")
        })

        


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