import kaboom from "kaboom";
import { destroyObject, createObject, saveLevel, updateBlockOpacity, isOccupied, isEqual } from "./blocks"
import { loadAssets } from "./loadAssets"
import { screenToGlobal } from "../game/classes/vec3"
import { gui } from "./gui"
import { Vec3 } from "../game/classes/vec3"

kaboom({
    background: [0,0,0]
})

loadAssets()

 
const tools = new gui(
    [width() - 40, 120],
    [20, 20],
    0.5,
    99,
    true,
)

export let toggleReal = false;

const floodFill = (tempCoords) => {
    const coords = new Vec3(tempCoords.pos.x, tempCoords.pos.y, tempCoords.pos.z)

    let hit = false
    while (!hit) {
        if (isOccupied(coords) || (coords.screenPos.x > width() || coords.screenPos.y > height() || coords.screenPos.x < 0 || coords.screenPos.y < 0)) { hit = true; break }
        createObject(structuredClone(coords))
        coords.add(1,0,0)
    }

}

const createCircle = (radius, pos) => {
    for (let i = pos.x; i < radius+pos.x; i++) {
        for (let j = pos.z; j < radius+pos.z; j++) {
            createObject(new Vec3(i, yLevel, j))
        }

    }
}

const changeTool = (tool) => {
    lastMouseCoords = new Vec3(0,0,0)
    if (tool === currentTool) return
    currentTool = tool

}

const toolSet = ["brush", "bucket", "square", "circle", "rubber", "line"]
let currentTool = toolSet[0]

//adding the tools to the gui
toolSet.forEach((e, i) => { tools.addObj(e, [(100/toolSet.length*0.5) * (2*i) + 8, 50], () => changeTool(e)) })
// tools.addObj(toolSet[0], [(100/4*0.5) * (0+1) ,50], () => console.log("brushing"))
// 1
// tools.addObj(toolSet[1], [(100/4*0.5) * (0+1+2) ,50], () => console.log("filling"))
// 3
// // tools.addObj(toolSet[0], [55,50], () => console.log("filling"))

// tools.addObj(toolSet[1], [(100/4*0.5)*(0+2+3),50], () => console.log("filling"))
// 5
// tools.addObj(toolSet[0], [(100/4*0.5)*(0+3+4),50], () => console.log("filling"))
// 7

// -2+2n


let yLevel = 0
let lastMouseCoords = new Vec3(0,0,0)

onKeyPress("shift", () => { if (currentTool == "brush") { changeTool("rubber") } else if (currentTool == "rubber") { changeTool("brush") } })


//Painting canvis
onMouseDown(() => {


    if (tools.clicked(mousePos())) { return }

    const coords = screenToGlobal(mousePos())
    //console.log(coords.z)
    coords.add(0, yLevel, 0)

    if (isEqual(lastMouseCoords, coords)) { return }
    lastMouseCoords = coords
    console.log("a")


    switch (currentTool)
    {
        case "brush": createObject(coords); break
        case "bucket": floodFill({...coords}); break
        case "square": break
        case "circle": createCircle(5, coords.pos); break
        case "rubber": destroyObject(coords); break
        case "line": break
    }


})

onKeyPress("s", () => {
    saveLevel()
})

onKeyPress("=", () => {
    updateBlockOpacity(yLevel, 0.40)
    yLevel++;
})
onKeyPress("-", () => {
    yLevel-- 
    updateBlockOpacity(yLevel, 1)
})


onKeyPress("b", () => {
    tools.toggleGui()
})

onKeyPress("g", () => {
    toggleReal = !toggleReal
})

