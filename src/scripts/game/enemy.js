import { Vec3 } from "../globalScripts/vec3"
import { Block } from "./block"
import { Entity } from "./entity"
import { level_one } from "./game"
import { Player } from "./player"

export class Enemy extends Entity {
    constructor(image, vec3) {
        super(image, origin("top"), vec3, "enemy", [30, -15])

        this.getSprite().scale = 0.07

        this.startMovementLoop()
    }

    startMovementLoop() {
        if (this.movementLoop != null) { this.movementLoop() }

        this.movementLoop = onUpdate(() => {
            const distance = level_one.player.vec3.distance(this.vec3)
            if(distance < 5 && distance > 0.1) {
                //this.stopMovementLoop()
                this.walkCancel()
                const a = this.walk(level_one.player.vec3)
                console.log(a)
            } 
        })
    }

    stopMovementLoop() { this.movementLoop() }

}