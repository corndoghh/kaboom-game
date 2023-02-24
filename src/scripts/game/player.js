import { Entity } from "./entity";
import { screenToGlobal } from "../globalScripts/vec3";
import { Vec3 } from "../globalScripts/vec3";
import { isEqual } from "../globalScripts/functions";
import { Inventory } from "./inventory";
import { camera, levelManager } from "./game";
import { gui } from "../globalScripts/gui";


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

        this.score = 0

        this.hud = []

        this.timeOffset = 0

        //this.startHud()

        this.clock = null

        this.lastTime = 0



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

    damage(amount = 1) {
        this.health -= amount

        if (this.health > 0) return
        
        const gameover = new gui([width(), height()], [0,0], 1, 400, false, color(50,50,50))

        gameover.addObj(text(`Gameover\n\nyou scored ${this.score} points`, {font: "sink", size: 36}), [50,50], 2, () => {});
        
        levelManager.getCurrentLevel().destroy()

        gameover.addObj(text("Press 'r' or click this button to restart", {font: "sink", size: 16}), [50,70], 2, () => {})

        gameover.addObj(rect(100,20), [50, 85], 2, () => {
            window.location.reload()
        })

        onKeyPress("r", () => {
            window.location.reload()

        })


        
    }

    startHud() {
        const health = new gui([500,100], [10,10], 1, 400, false, color(100,100,100))
        const score = new gui([500,100], [width()-510,10], 1, 400, false, color(100,100,100))
        const timeG = new gui([250,250], [10,height()-260], 1, 400, false, color(100,100,100))



        health.addObj(text(``, {font: "sink", size: 26}), [50,50], 1, () => {})
        score.addObj(text(``, {font: "sink", size: 26}), [50,50], 1, () => {})
        timeG.addObj(text(``, {font: "sink", size: 26}), [50,50], 1, () => {})



        this.clock = onUpdate(() => {
            timeG.objs.entries().next().value[0].text = Math.floor(time()) - this.timeOffset

            this.lastTime = Math.floor(time()) - this.timeOffset
            
            health.objs.entries().next().value[0].text = `Health: ${this.health}`
            score.objs.entries().next().value[0].text = `Score: ${this.score}`



        })

        this.hud = [
            health,
            score,
            timeG
        ]

    }

    stopHud() {


        this.hud[0].remove()
        this.hud[1].remove()
        this.hud[2].remove()



        if (this.clock) this.clock()

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


    getPos() { return this.vec3 }
    
}