import kaboom from "kaboom";
import { destroyObject, createObject, saveLevel } from "./blocks"
import { loadAssets } from "./loadAssets"
import { screenToGlobal } from "../game/classes/vec3"
import { gui } from "./gui"

kaboom({
    background: [0,0,0]
})

loadAssets()

let brushToggle = false

onKeyPress("shift", () => { brushToggle = !brushToggle })

//click loop
onMouseDown(() => {
    if (!brushToggle) { 
        createObject(screenToGlobal(mousePos()))
    }
    else {
        destroyObject(screenToGlobal(mousePos()))
    }
})

onKeyPress("s", () => {
    saveLevel()
})

const brushes = new gui(
    [width() - 40, 120],
    [20, 20],
    0.5,
    true
)

onKeyPress("b", () => {
    brushes.toggleGui()
})

onClick(() => {
    
})