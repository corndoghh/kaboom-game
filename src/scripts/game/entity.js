import { isEqual } from "../globalScripts/functions"
import { screenToGlobal, Vec3 } from "../globalScripts/vec3"
import { level_one } from "./game"

export class Entity {
    constructor(image, origin, vec3, type, offset = vec2(0)) {
        this.vec3 = vec3
        this.offset = offset
        this.image = image
        this.type = type
        this.walkCancel = () => {console.log("first")}
        this.sprite = add([
            sprite(image),
            scale(0.5),
            z(this.vec3.z+2),
            pos(vec2(this.vec3.screenPos.x, this.vec3.screenPos.y).add(offset)),
            origin
        ])

        this.sprite.width /= 2
        this.sprite.height /= 2


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
        level_one.entites = level_one.entites.filter((x) => x != this)
        this.sprite.destroy()
    }
    


    walk(vec) {   
        const anotherTempVec = vec.vecDistance(this.vec3)
        const tempVec = Object.assign({}, this.vec3)
        const vecy3 = new Vec3(tempVec.pos.x, tempVec.pos.y, tempVec.pos.z)

        const ave = vec.vecDistance(this.vec3)

        anotherTempVec.add(tempVec.pos.x, tempVec.pos.y, tempVec.pos.z)

        const total = (anotherTempVec.pos.x + anotherTempVec.pos.z)

        let lastDis = vecy3.distance(anotherTempVec)+1


        const percentage = { x: anotherTempVec.pos.x / total, z: anotherTempVec.pos.z / total }

        this.walkCancel = onUpdate(() => {
            if (vecy3.distance(anotherTempVec) < 0.5) { this.walkCancel(); this.moveTo(vec);

            const movement = new CustomEvent('playerMovement', {
                bubbles: true,
                cancelable: true,
                detail: {
                    entity: this,
                    level: level_one,
                    to: vec,
                    toReal: vec2(vecy3.screenPos.x, vecy3.screenPos.y),
                }
            });
            if (!document.dispatchEvent(movement)) return;


            }
            console.log(vecy3.distance(anotherTempVec))

            lastDis = vecy3.distance(anotherTempVec)

            vecy3.add(ave.pos.x * dt() * Math.random()*0.8 , ave.pos.y * dt() * Math.random()*2, ave.pos.z * dt() * Math.random()*0.8)


            //console.log(vecy3)
            this.moveTo(vecy3)
        }) 



    }
    
}