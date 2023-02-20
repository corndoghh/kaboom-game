import { boxInput, isEqual } from "../globalScripts/functions";
import { gui } from "../globalScripts/gui";
import { screenToGlobal, Vec3 } from "../globalScripts/vec3"
import { Block } from "./block";
import { Camera } from "./camera";
import { camera, levelManager } from "./game";

const preventCollision = (con, e) => { if (con) { e.preventDefault(); return true }; return false; } 

const isEndCollide = (vec, e) => { return isEqual(e.level.end.vec3, vec) }
const isPlayerCollide = (vec, e) => { return e.level.getEntityAt(vec).filter((x) => x.type == "player") } 
const isEnemyCollide = (vec, e) => {
    return levelManager.getCurrentLevel().getEntityAt(vec).filter((x) => x.type == "enemy")
}

const isBlockCollide = (vec, e) => { return e.level.getObjectAt(vec) }
const isItemCollide = (vec, e) => { if (e.level.getEntityAt(vec) != null) { return e.level.getEntityAt(vec).filter((x) => x.type == "item") } }




const moveEvent = async (fullEvent) => {
    if (levelManager.getPlayer().inventory.isOpen()) { fullEvent.preventDefault(); return true }
    const e = fullEvent.detail
    const vec = new Vec3(Math.round(e.to.x+0.1), Math.round(e.to.y+0.1), Math.round(e.to.z+0.1))
    //console.log(e.to.x)
    const realBlock = screenToGlobal(e.toReal)
    realBlock.add(1,0,0)
    if (preventCollision(!isBlockCollide(vec, e), fullEvent)) { console.log("passed", vec); return true }
    vec.add(0,1,0)
    if (preventCollision(isBlockCollide(vec, e), fullEvent)) { return true }

    switch (e.entity.type) {
        
        case "player": {

            const item = isItemCollide(realBlock, e)[0]
            if (item) {
                //item.destroyItem()
                levelManager.getPlayer().inventory.addItem(item)
            }

            if (isEndCollide(realBlock, e)) {

                levelManager.getCurrentLevel().disable()

                const question = [Math.floor(Math.random() * 20), ["+", "-", "*"][Math.floor(Math.random() * 2)], Math.floor(Math.random() * 20)]

                const answer = question[1] == "+" ? question[0] + question[2] : question[1] == "-" ? question[0] - question[2] : question[0] * question[1]

                //const data = await new Promise( async (resolve, _reject) => {
                const data = await boxInput(text("Answer", {font: "sink"}), text("What is " + question[0] + " " + question[1] + " " + question[2] + "?"), [0,0,0,0.9], true)            

                if (parseInt(data) == answer) {
                    levelManager.changeLevel(levelManager.currentLevel.end.levelTo)
                    return 
                }

                levelManager.changeLevel(levelManager.levelName)



            }
            // const entity = e.level.getEntityAt(realBlock)[0]
            // if (entity != null && entity.type == "item") { entity.destroy() }
            break;
        }
        case "enemy": {
            
            //e.preventDefault()


            if (levelManager.getPlayer().vec3.distance(realBlock) < 2 && ((e.entity.lastCoolDown + e.entity.coolDown) - time()) <= 0) {
                console.log(time() - (e.entity.lastCoolDown + e.entity.coolDown))
                levelManager.attack(e.entity)
                e.entity.lastCoolDown = time()

                // shake()
                // play("rock", {volume: 0.2})
                // levelManager.getPlayer().health -= 1
                // if (!levelManager.getPlayer().health ) {
                //     const loading = new gui([width(), height()], [0,0], 1, 100, false, color(50,50,50))    
                // }
            }

            //console.log(levelManager.getPlayer().health) 


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
            if (block && e.to.distance(e.from) <= 6) {
                levelManager.getCurrentLevel().getBlockAt(block.pos)[0].destroy()
                console.log("nice")

            } 
            break
        }
        // case "axe": {
        //     new Block(screenToGlobal(e.mouseVec), "snow")
        //     console.log(e.mouseVec)
        //     const enemy = isEnemyCollide(screenToGlobal(e.mouseVec), e)
        //     console.log(enemy)
        //     if (enemy[0]) {
        //         enemy[0].destroyEnemy()
        //     }
        //     break;
        // }
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


