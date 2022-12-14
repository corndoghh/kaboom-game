import { Entity } from "./entity";
import { screenToGlobal } from "../globalScripts/vec3";
import { Vec3 } from "../globalScripts/vec3";
import { isEqual } from "../globalScripts/functions";
import { Inventory } from "./inventory";
import { level_one } from "./game";


const handler = (event) => {
    if (!event.returnValue) return
    if (event.detail.toggle) level_one.player.inventory.toggle()
    

}


export class Player extends Entity  {
    constructor(image) {
        super(image, origin("bot"), new Vec3(10,0,10), "player", vec2(32, 20))

        //blocks per second 
        this.speed = 3

        this.inventory = new Inventory();


        //this.startMovement()


        this.startInventoryLoop()



    }

    startInventoryLoop() {
        document.addEventListener("inventoryEvent", handler)
    }

    stopInventoryLoop() {
        document.removeEventListener("inventoryEvent", handler)
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

    walk(vec) {
        const from = Object.assign({}, this.getPos().pos)
        const to = vec.pos
        const distanceToTraval = {x: (to.x - from.x), y: (to.y - from.y), z: (to.z - from.z)}
        const angle = Math.atan( (from.x - to.x) / (from.z - to.z) )
        console.log(angle / (Math.PI/180))
        const distance =  Math.abs(Math.sin(angle)) + Math.abs(Math.cos(angle))
        const percentage = { x: +(Math.sin(angle) / distance).toFixed(3), z: +(Math.cos(angle) / distance).toFixed(3) }
        
        console.log(distanceToTraval)


        const directionMove = new Vec3(this.speed * percentage.x, 0, this.speed * percentage.z)

        console.log(percentage)

        console.log(this.getPos().pos.x)

        const cancelUpdate = onUpdate(() => {
            if (from.z + distanceToTraval.z <= this.getPos().pos.z && from.x + distanceToTraval.x <= this.getPos().pos.x) {
                this.vec3 = vec
                cancelUpdate()
                return
            } 
            const smooth = dt()
            this.getPos().add(directionMove.pos.x * smooth , directionMove.pos.y * smooth, directionMove.pos.z * smooth)
            this.moveTo(this.getPos())
        }); 

    }

    getPos() { return this.vec3 }
    
}