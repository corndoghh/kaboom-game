
import { screenToGlobal, Vec3 } from "../globalScripts/vec3";
import { camera, levelManager } from "./game";
import { levelLoader } from "./levelLoader";

let enabled = false

const pine = (e) => {
    if (!e.returnValue) return;


    const before = screenToGlobal(levelManager.getPlayer().hud[0].gui.pos)

    
    
    
    
    const cam = camera
    const pos = new Vec3(e.detail.to.x, e.detail.to.y, e.detail.to.z)
    const d = Object.assign({}, cam.start)
    console.log("BEFORE", levelManager.getPlayer().hud[0].gui.pos, d)

    const distance = pos.distance(cam.start)
    if (distance > 10) {
        const ave =  pos.vecDistance(cam.start)
        cam.transform.pos.x += ave.pos.x
        cam.transform.pos.z += ave.pos.z

        console.log(cam.transform)

        const tempVec = Object.assign({}, cam.start)
        const vecy3 = new Vec3(tempVec.pos.x, tempVec.pos.y, tempVec.pos.z)
        cam.start = Object.assign({}, cam.object.getPos())
        const cancel = onUpdate(() => { 
            if (!enabled) {
                cancel()
                wait(0.01, () => {
                    camPos(width()/2, height()/2)

                })
            }
            //levelManager.getPlayer().hud[0].gui.moveBy(-(vecy3.screenPos.x - camPos().x) , -(vecy3.screenPos.y - camPos().y))
            vecy3.add(ave.pos.x * dt() , ave.pos.y * dt() * Math.random()*2, ave.pos.z * dt())
            camPos(vec2(vecy3.screenPos.x, vecy3.screenPos.y))
        })
        wait(1, () => {
            cancel()
        })

        camPos(cam.object.sprite.pos)
        levelManager.getPlayer().hud[0].gui.moveBy(-(d.screenPos.x - camPos().x)  , -(d.screenPos.y - camPos().y) )

            
        //levelManager.getPlayer().hud[0].gui.moveBy(-(d.screenPos.x - camPos().x), -(d.screenPos.y - camPos().y))
            //levelManager.getPlayer().hud[0].gui.moveTo(vec2(ave.screenPos.x, ave.screenPos.y))


    }
    //console.log(distance)

}


export class Camera {
    constructor(object) {

        this.transform = {
            pos: {x: 0, z: 0}
        }
        this.object = object
        this.start = Object.assign({}, object.getPos())

        this.startNew = Object.assign({}, object.sprite.pos)

        camPos(object.sprite.pos)



        //wait(5, () => this.stopCameraLoop())

    }


    



    startCameraLoop() {
        enabled = true
        document.addEventListener("playerMovement", pine)


    }


    stopCameraLoop() {
        enabled = false

        document.removeEventListener("playerMovement", pine)
    }
}