import { Entity } from "./entity";
import { screenToGlobal } from "../globalScripts/vec3";
import { Vec3 } from "../globalScripts/vec3";
import { isEqual } from "../globalScripts/functions";
import { Inventory } from "./inventory";
import { camera, levelManager } from "./game";


const handler = (event) => {
    if (!event.returnValue) return
    if (event.detail.toggle) levelManager.getPlayer().inventory.toggle()
    if (!levelManager.getPlayer().inventory.gui.hidden) { 
        camera.stopCameraLoop()
        camPos(width()/2, height()/2) 
    } else {
        camera.startCameraLoop()
        camPos(vec2(camera.start.screenPos.x, camera.start.screenPos.y))
    }
    

}


export class Player extends Entity  {
    constructor(image) {
        super(image, origin("bot"), new Vec3(10,0,10), "player", vec2(32, 20))

        //blocks per second 
        this.speed = 3

        this.inventory = new Inventory();

        this.equipped = null

        this.health = 3



        //this.startMovement()


        this.startInventoryLoop()



    }

    startInventoryLoop() {
        document.addEventListener("inventoryEvent", handler)
    }

    stopInventoryLoop() {
        document.removeEventListener("inventoryEvent", handler)
    }

    equipt(index) { console.log(index); this.equipped = this.inventory.getItems().get(index) }



    // startMovement() {

    //     if (this.movementLoop != null) { this.movementLoop() }

    //     this.movementLoop = onClick(() => {
    //         const coords = screenToGlobal(mousePos())
    //         coords.add(1.2,0,0.3)
    //         this.move(coords)
    //     })
    // }

    // cancelMovement() { this.movementLoop() }


    getPos() { return this.vec3 }
    
}