import { isEqual } from "../globalScripts/functions";
import { screenToGlobal, Vec3 } from "../globalScripts/vec3"
import { level_one } from "./game";

const preventCollision = (con, e) => { if (con) { e.preventDefault(); return true }; return false; } 

const isPlayerCollide = (vec, e) => { return e.level.getEntityAt(vec).filter((x) => x.type == "player") } 
const isEnemyCollide = (vec, e) => { return e.level.getEntityAt(vec).filter((x) => x.type == "enemy") }
const isBlockCollide = (vec, e) => { return e.level.getObjectAt(vec) }
const isItemCollide = (vec, e) => { if (e.level.getEntityAt(vec) != null) { return e.level.getEntityAt(vec).filter((x) => x.type == "item") } }
const isEndCollide = (vec, e) => {}




const moveEvent = (fullEvent) => {
    if (level_one.player.inventory.isOpen()) { fullEvent.preventDefault(); return true }
    const e = fullEvent.detail
    const vec = new Vec3(Math.round(e.to.x+0.1), Math.round(e.to.y+0.1), Math.round(e.to.z+0.1))
    const realBlock = screenToGlobal(e.toReal)
    realBlock.add(1,0,0)
    console.log(e.entity.type)
    switch (e.entity.type) {
        case "player": {
            if (preventCollision(!isBlockCollide(vec, e), fullEvent)) { return true }
            vec.add(0,1,0)
            if (preventCollision(isBlockCollide(vec, e), fullEvent)) { return true }

            const item = isItemCollide(realBlock, e)[0]
            if (item) {
                level_one.player.inventory.addItem(item)
            }
            // const entity = e.level.getEntityAt(realBlock)[0]
            // if (entity != null && entity.type == "item") { entity.destroy() }
            break;
        }
        case "enemy": {
            console.log("hicue")
            shake()
            play("rock", {volume: 0.2})
            


        }
    }



}


const clickEvent = (event) => {
    const e = event.detail
    const equippedItem = e.entity.equipped;

    
    switch (equippedItem) {
        case "pick": {
            const vec = new Vec3(e.to.pos.x, e.to.pos.y, e.to.pos.z)
            vec.add(1,1,1)
            const block = isBlockCollide(vec, e)
            if (block) {
                level_one.getBlockAt(block.pos)[0].destroy()
                console.log("nice")

            } 
            break
        }
        case "axe": {
            console.log("axeful")
            break;
        }
        case "bow": {
            console.log("bowful")
            break;
        }

    }


}



export const loadEvents = () => {
    document.addEventListener("movement", (e) => {

        //void check
        if (!e.detail.level.getObjectAt(e.detail.to)) {
            e.preventDefault()
        }

    })






    document.addEventListener("playerMovement", moveEvent)
    document.addEventListener("customClick", clickEvent)

    //10 1 15
}


