import { Entity } from "./entity";

export class End extends Entity {

    constructor(image, pos, levelTo) {

        super(image, origin("top"), pos, "end", [30, -15])
        this.levelTo = levelTo

        this.getSprite().scale = 0.07


    }

}