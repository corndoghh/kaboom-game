import { Entity } from "./entity"

export class Item extends Entity {
    constructor(image, pos) {
        super(image, origin("top"), pos, [30, -15])

        this.getSprite().scale = 0.07
    }
}