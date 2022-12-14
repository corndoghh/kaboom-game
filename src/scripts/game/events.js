import { screenToGlobal, Vec3 } from "../globalScripts/vec3"

const preventCollision = (con, e) => { if (con) { e.preventDefault(); return true }; return false; } 

const isPlayerCollide = (vec, e) => {} 
const isEnemyCollide = (vec, e) => { return e.level.getEntityAt(vec).filter((x) => x.type == "enemy") }
const isBlockCollide = (vec, e) => { return e.level.getObjectAt(vec) }
const isItemCollide = (vec, e) => { if (e.level.getEntityAt(vec) != null) { return e.level.getEntityAt(vec).filter((x) => x.type == "item") } }
const isEndCollide = (vec, e) => {}




const moveEvent = (fullEvent) => {
    const e = fullEvent.detail
    const vec = new Vec3(Math.round(e.to.x+0.1), Math.round(e.to.y+0.1), Math.round(e.to.z+0.1))
    const realBlock = screenToGlobal(e.toReal)
    realBlock.add(1,0,0)
    switch (e.entity.type) {
        case "player": {
            if (preventCollision(!isBlockCollide(vec, e), fullEvent)) { return true }
            vec.add(0,1,0)
            if (preventCollision(isBlockCollide(vec, e), fullEvent)) { return true }

            const item = isItemCollide(realBlock, e)[0]
            if (item) { item.destroy() }
            // const entity = e.level.getEntityAt(realBlock)[0]
            // if (entity != null && entity.type == "item") { entity.destroy() }

        }
        case "enemy": {

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
    //10 1 15
}


