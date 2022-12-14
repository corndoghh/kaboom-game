import { Vec3 } from "../globalScripts/vec3"
import { Block } from "./block"
import { Entity } from "./entity"

export class Item extends Entity {
    constructor(image, vec3) {
        super(image, origin("top"), vec3, "item", [30, -15])


        this.pointer = new Block(vec3, "grass")

        console.log(this.pointer)

        this.getSprite().scale = 0.07
    }

    destroyItem() {
        this.destroy()
        this.pointer.destroy()
    }
}