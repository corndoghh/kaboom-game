
import { Vec3 } from "../globalScripts/vec3";
import { camera } from "./game";
const pine = (e) => {
    if (!e.returnValue) return;

    
    const cam = camera
    const pos = new Vec3(e.detail.to.x, e.detail.to.y, e.detail.to.z)
    const distance = pos.distance(cam.start)
    if (distance > 10) {
        const ave =  pos.vecDistance(cam.start)
        const tempVec = Object.assign({}, cam.start)
        const vecy3 = new Vec3(tempVec.pos.x, tempVec.pos.y, tempVec.pos.z)
        cam.start = Object.assign({}, cam.object.getPos())
        const cancel = onUpdate(() => { 
            vecy3.add(ave.pos.x * dt() , ave.pos.y * dt() * Math.random()*2, ave.pos.z * dt())
            camPos(vec2(vecy3.screenPos.x, vecy3.screenPos.y))
        })
        wait(1, () => {
            cancel()
        })
        camPos(cam.object.sprite.pos)
    }
    //console.log(distance)

}


export class Camera {
    constructor(level, object) {
        this.level = level
        this.object = object
        this.start = Object.assign({}, object.getPos())

        camPos(object.sprite.pos)

        this.startCameraLoop()

        //wait(5, () => this.stopCameraLoop())

    }


    



    startCameraLoop() {
        console.log(this)
        document.addEventListener("playerMovement", pine)


    }


    stopCameraLoop() {
        document.removeEventListener("playerMovement", pine)
    }
}