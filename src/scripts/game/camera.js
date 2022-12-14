
import { Vec3 } from "../globalScripts/vec3";
import { camera } from "./game";

const pine = (e) => {
    if (!e.returnValue) return;

    
    const cam = camera
    const pos = new Vec3(e.detail.to.x, e.detail.to.y, e.detail.to.z)
    const distance = pos.distance(cam.start)
    if (distance.x >= 10 || distance.z >= 10) {
        camPos(cam.object.sprite.pos)
        cam.start = Object.assign({}, cam.object.getPos())
        //console.log(cam.start)
        console.log(pos.distance(cam.start))
    }
    //console.log(distance)

}


export class Camera {
    constructor(level, object) {
        this.level = level
        this.object = object
        this.start = Object.assign({}, object.getPos())

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