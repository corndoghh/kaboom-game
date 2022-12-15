import { isEqual } from "../globalScripts/functions"
import { level_one } from "./game"

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
        level_one.blocks = level_one.blocks.filter((x) => !isEqual(x.pos, this.vec3.pos))
        level_one.rawBlocks = level_one.rawBlocks.filter((x) => !isEqual(x.pos, this.vec3.pos))
        level_one.realBlocks = level_one.realBlocks.filter((x) => x != this)
        this.destroySoft()
    }

    destroySoft() {
        this.sprite.destroy()
    }
}


//0,0,8
//9,0,28