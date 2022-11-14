import kaboom from "kaboom";
import { destroyObject, createObject, saveLevel } from "./blocks"
import { load } from "./loadAssets"
import { screenToGlobal } from "../game/classes/vec3"

kaboom({
    background: [0,0,0]
})

load()

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
