import { isEqual } from "../globalScripts/functions"
import { screenToGlobal, Vec3 } from "../globalScripts/vec3"
import { levelManager } from "./game"

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
        let item = levelManager.getCurrentLevel().entites.filter((x) => x == this)
        //levelManager.getCurrentLevel().entites.splice(levelManager.getCurrentLevel().entites.indexOf(item), 1)
        if (levelManager.getCurrentLevel().enemies.includes(item)) {
            levelManager.getCurrentLevel().enemies.splice(levelManager.getCurrentLevel().enemies.indexOf(item), 1)
        }
        if (levelManager.getCurrentLevel().items.includes(item)) {
            levelManager.getCurrentLevel().items.splice(levelManager.getCurrentLevel().items.indexOf(item), 1)
        }


        this.sprite.destroy()
    }
    


    walk(vec, override = false, execute = null) {   
        const anotherTempVec = vec.vecDistance(this.vec3)
        const tempVec = Object.assign({}, this.vec3)
        const vecy3 = new Vec3(tempVec.pos.x, tempVec.pos.y, tempVec.pos.z)

        const ave = vec.vecDistance(this.vec3)

        anotherTempVec.add(tempVec.pos.x, tempVec.pos.y, tempVec.pos.z)

        const total = (anotherTempVec.pos.x + anotherTempVec.pos.z)

        let lastDis = vecy3.distance(anotherTempVec)+1


        const percentage = { x: anotherTempVec.pos.x / total, z: anotherTempVec.pos.z / total }

        this.walkCancel = onUpdate(() => {
            console.log("moving")

            if (levelManager.getCurrentLevel().isDisabled() && !override) { this.walkCancel(); return }

            if (vecy3.distance(anotherTempVec) < 0.5) { this.walkCancel(); this.moveTo(vec) ;





            }
            const movement = new CustomEvent('playerMovement', {
                bubbles: true,
                cancelable: true,
                detail: {
                    entity: this,
                    level: levelManager.getCurrentLevel(),
                    to: vecy3.pos,
                    toReal: vec2(vecy3.screenPos.x, vecy3.screenPos.y),
                }
            });
            const test = !document.dispatchEvent(movement)
            console.log(test)
            if (test && !override) {
                this.moveTo(new Vec3(tempVec.pos.x - 1, tempVec.pos.y, tempVec.pos.z))
                return
            };
            // console.log(vecy3.distance(anotherTempVec))

            lastDis = vecy3.distance(anotherTempVec)

            vecy3.add(ave.pos.x * dt() * (!(Math.random()*0.8 * !override) ? 1 :  Math.random()*0.8) , ave.pos.y * dt() * Math.random()*2, ave.pos.z * dt() * (!(Math.random()*0.8 * !override) ? 1 :  Math.random()*0.8))


            //console.log(vecy3)
            this.moveTo(vecy3)
            if (execute) execute()


        }) 



    }
    
}