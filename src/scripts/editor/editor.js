import kaboom from "kaboom";
import { destroyObject, createObject, saveLevel, updateBlockOpacity, isOccupied } from "./blocks"
import { isEqual } from "../globalScripts/functions";
import { loadAssets } from "./loadAssets"
import { screenToGlobal } from "../globalScripts/vec3"
import { gui } from "../globalScripts/gui"
import { Vec3 } from "../globalScripts/vec3"
import { selectorScreen } from "./levelSelector"
import { createItem } from "./item";
import { createEntity } from "./entity";

kaboom({
    background: [0,0,0]
})

loadAssets()

focus()

const level = await selectorScreen();

// console.log(level)

const session = level.session;
if (!level.new) { level.rawBlockData.forEach((x) => { createObject(new Vec3(x.coords.x, x.coords.y, x.coords.z)) }) }

export let currentBlock = "grass"
export let currentItem = null;
export let currentEnity = null;

 
const tools = new gui(
    [width() - 40, 120],
    [20, 20],
    0.5,
    99,
    true,
)

const blocks = new gui (
    [width() - 40, 120],
    [20, 140],
    0.5,
    99,
    true,
)


const items = new gui (
    [width() - 40, 120],
    [20, 260],
    0.5,
    99,
    true,
)

const entites = new gui (
    [width() - 40, 120],
    [20, 380],
    0.5,
    99,
    true,
)

export let toggleReal = true;

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
const blockSet = ["grass", "snow"]
const itemsSet = ["bow", "axe", "pick"]
const entitySet = ["enemy", "player", "end"]

let currentTool = toolSet[0]

//adding the tools to the gui
toolSet.forEach((e, i) => { tools.addObj(sprite(e), [(100/toolSet.length*0.5) * (2*i) + 8, 50], 0.2, () => changeTool(e)) })
blockSet.forEach((e, i) => { blocks.addObj(sprite(e), [(100/blockSet.length*0.5) * (2*i) + 8, 50], 1, () => { currentEnity = null; currentItem = null; currentBlock = e } ) })
itemsSet.forEach((e, i) => { items.addObj(sprite(e), [(100/itemsSet.length*0.5) * (2*i) + 8, 50], 0.2, () => { currentEnity = null; currentItem = e; currentBlock = null }) })
entitySet.forEach((e, i) => { entites.addObj(sprite(e), [(100/entitySet.length*0.5) * (2*i) + 8, 50], 0.2, () => { currentEnity = e; currentItem = null; currentBlock = null }) })

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
    if (blocks.clicked(mousePos())) { return }
    if (items.clicked(mousePos())) { return }
    if (entites.clicked(mousePos())) { return }


    const coords = screenToGlobal(mousePos())
    //console.log(coords.z)
    coords.add(0, yLevel, 0)

    if (isEqual(lastMouseCoords, coords)) { return }
    lastMouseCoords = coords
    console.log("a")


    if (currentBlock != null)
    {
        switch (currentTool)
        {
            case "brush": createObject(coords); break
            case "bucket": floodFill({...coords}); break
            case "square": break
            case "circle": createCircle(5, coords.pos); break
            case "rubber": destroyObject(coords); break
            case "line": break
        }
        return
    }

    if (currentItem != null)
    {
        createItem(coords)
        return
    }
    
    if (currentEnity != null)
    {
        createEntity(coords, currentEnity)
    }



})

onKeyPress("s", () => {
    if (!tools.gui.hidden) { tools.toggleGui() }
    saveLevel(session)

})

onKeyPress("=", () => {
    updateBlockOpacity(yLevel, 0.40)
    yLevel++;
})
onKeyPress("-", () => {
    yLevel-- 
    updateBlockOpacity(yLevel, 1)
})


onKeyPress("t", () => {
    tools.toggleGui()
})
onKeyPress("b", () => {
    blocks.toggleGui()
})
onKeyPress("e", () => {
    entites.toggleGui()
})
onKeyPress("i", () => {
    items.toggleGui()
})

onKeyPress("g", () => {
    toggleReal = !toggleReal
})

