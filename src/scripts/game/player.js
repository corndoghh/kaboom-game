import { Entity } from "./entity";
import { screenToGlobal } from "../globalScripts/vec3";
import { Vec3 } from "../globalScripts/vec3";




export class Player extends Entity  {
    constructor(image) {
        super(image, origin("bot"), [10,0,10], vec2(32, 20))

        //blocks per frame 
        this.speed = 0.3


        //this.startMovement()
    }


    // startMovement() {

    //     if (this.movementLoop != null) { this.movementLoop() }

    //     this.movementLoop = onClick(() => {
    //         const coords = screenToGlobal(mousePos())
    //         coords.add(1.2,0,0.3)
    //         this.move(coords)
    //     })
    // }

    // cancelMovement() { this.movementLoop() }

    walk(vec3) {
        this.moveTo(vec3)
        // const diffrence = this.getPos()
        // diffrence.sub(vec3)
        // diffrence.multiplier(this.speed)
        // console.log(diffrence)
        // const cancelUpdate = onUpdate(() => {
        //     this.moveBy(diffrence)
            
            
        // })
    }

    getPos() { return this.vec3 }
    
}