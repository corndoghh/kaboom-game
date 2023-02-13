import { isEqual } from "../globalScripts/functions"
import { Entity } from "./entity"
import { levelManager } from "./game"


export class Enemy extends Entity {
    constructor(image, vec3) {
        super(image, origin("top"), vec3, "enemy", [30, -15])

        this.getSprite().scale = 0.07

        this.coolDown = 5

        this.lastCoolDown = time()


        this.startMovementLoop()

    }

    startMovementLoop() {
        if (this.movementLoop != null) { this.movementLoop() }

        this.movementLoop = onUpdate(() => {

     
            const distance = levelManager.getPlayer().vec3.distance(this.vec3)
            if(distance < 5 && distance > 0.1) {
                //this.stopMovementLoop()
                this.walkCancel()
                this.walk(levelManager.getPlayer().vec3)
            } 
        })
    }

    stopMovementLoop() { this.movementLoop() }


    destroyEnemy() {
        this.stopMovementLoop()
        this.destroy()
    }
}