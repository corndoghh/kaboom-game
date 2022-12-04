import { Vec3 } from "../globalScripts/vec3"

export class Entity {
    constructor(image, origin, globalCoords, offset = vec2(0)) {
        this.vec3 = new Vec3(globalCoords[0], globalCoords[1], globalCoords[2])
        this.offset = offset
        this.sprite = add([
            sprite(image),
            scale(0.5),
            z(this.vec3.z+1),
            pos(vec2(this.vec3.screenPos.x, this.vec3.screenPos.y).add(offset)),
            origin
        ])

    }

    getSprite() { return this.sprite }


    moveTo(vec) { this.sprite.pos = vec2(vec.screenPos.x, vec.screenPos.y).add(this.offset); this.vec3 = vec } 

    moveBy(vec) {
        const vec3 = vec
        vec3.add(this.vec3); this.vec3 = vec3;
        this.sprite.pos += vec2(vec.screenPos.x, vec.screenPos.y)
        console.log(this.sprite.pos)
    }

    destroy() {
        this.sprite.destroy()
    }
    
    
}