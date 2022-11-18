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

tools.addObj("brush", [5,50], () => console.log("brushing"))
tools.addObj("bucket", [20,50], () => console.log("filling"))

let brushToggle = false
let yLevel = 0

onKeyPress("shift", () => { brushToggle = !brushToggle })

//click loop
onMouseDown(() => {

    if (tools.clicked(mousePos())) { return }

    const coords = screenToGlobal(mousePos())
    //console.log(coords.z)
    coords.add(new Vec3(0, yLevel, 0))
    //coords.screenPos.y += (32 * yLevel)
    //coords.z += yLevel+(1 * yLevel)
    //console.log(coords.z)


    if (!brushToggle) { 
        createObject(coords)
    }
    else {
        destroyObject(coords)
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
