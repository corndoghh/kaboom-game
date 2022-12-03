import { Entity } from "./entity"

export class Item extends Entity {
    constructor(image) {
        super(image, origin("top"), [10,0,20], [30, -15])

        this.getSprite().scale = 0.07
    }
}