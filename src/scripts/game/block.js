import { isEqual } from "../globalScripts/functions"
import { levelManager } from "./game"

export class Block {
    constructor(vec3, image) {
        this.image = image
        this.vec3 = vec3,
        this.sprite = add([
            sprite(image),
            pos(vec2(vec3.screenPos.x, vec3.screenPos.y)),
            z(vec3.z)
        ])
                
    }

    destroy() {
        levelManager.getCurrentLevel().blocks = levelManager.getCurrentLevel().blocks.filter((x) => !isEqual(x.vec3.pos, this.vec3.pos))
        levelManager.getCurrentLevel().rawBlocks = levelManager.getCurrentLevel().rawBlocks.filter((x) => !isEqual(x.pos, this.vec3.pos))
        this.destroySoft()
    }

    destroySoft() {
        this.sprite.destroy()
    }

}


//0,0,8
//9,0,28