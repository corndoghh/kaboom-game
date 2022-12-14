import { Vec3 } from "../globalScripts/vec3"

export class Entity {
    constructor(image, origin, vec3, type, offset = vec2(0)) {
        this.vec3 = vec3
        this.offset = offset
        this.type = type
        this.sprite = add([
            sprite(image),
            scale(0.5),
            z(this.vec3.z+2),
            pos(vec2(this.vec3.screenPos.x, this.vec3.screenPos.y).add(offset)),
            origin
        ])

    }

    getSprite() { return this.sprite }


    moveTo(vec) { this.sprite.pos = vec2(vec.screenPos.x, vec.screenPos.y).add(this.offset); this.vec3 = vec; this.sprite.z = vec.z+1 } 

    // moveBy(vec) {
    //     const vec3 = vec
    //     vec3.add(this.vec3); this.vec3 = vec3;
    //     this.sprite.pos += vec2(vec.screenPos.x, vec.screenPos.y)
    //     console.log(this.sprite.pos)
    // }

    destroy() {
        this.sprite.destroy()
    }
    
    
}