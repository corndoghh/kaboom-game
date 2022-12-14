import { Vec3 } from "../globalScripts/vec3"
import { Block } from "./block"
import { Entity } from "./entity"

export class Enemy extends Entity {
    constructor(image, vec3) {
        super(image, origin("top"), vec3, "ememy", [30, -15])

        this.getSprite().scale = 0.07
    }

}