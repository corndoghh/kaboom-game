import kaboom from "kaboom";
import { generateBoard, destroyObject } from "./levelGeneration"
import { load } from "./loadAssets"
import { screenToGlobal } from "./classes/vec3"

kaboom({
    background: [0,0,0]
})

load()

generateBoard()

//click loop
onMouseDown(() => {
    destroyObject(screenToGlobal(mousePos()))
})

