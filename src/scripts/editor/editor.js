import kaboom from "kaboom";
import { destroyObject, createObject, saveLevel, updateBlockOpacity } from "./blocks"
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

const changeTool = (tool) => {
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

onKeyPress("shift", () => { if (currentTool == "brush") { currentTool = "rubber" } else if (currentTool == "rubber") { currentTool = "brush" } })

//Painting canvis
onMouseDown(() => {

    if (tools.clicked(mousePos())) { return }

    const coords = screenToGlobal(mousePos())
    //console.log(coords.z)
    coords.add(new Vec3(0, yLevel, 0))

    console.log(currentTool)
    switch (currentTool)
    {
        case "brush": createObject(coords); break
        case "bucket": break
        case "square": break
        case "circle": break
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
