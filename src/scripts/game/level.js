import kaboom from "kaboom";
import { isEqual } from "../globalScripts/functions";
import { screenToGlobal, Vec3 } from "../globalScripts/vec3";
import { Block } from "./block";
import { End } from "./end";
import { Enemy } from "./enemy";
import { Entity } from "./entity";
import { camera } from "./game";
import { Item } from "./item";
import { startKeybinds, stopKeybinds } from "./keybinds";

const levels = new Map();



export class Level {
    constructor(name, levelData, player) {
        this.loadLevel(name, levelData, player)
        startKeybinds()

    }

    loadLevel(name, levelData, player) {
        //settings class objects
        this.player = player
        this.items = levelData.items
        this.entites = []
        this.name = name
        //this.blocks = levelData.blocks
        this.lastClickedBlock = null
        this.currentObjectClicked = null
        this.rawBlocks = levelData.rawBlocks
        this.blocks = []
        this.enabled = true

        console.log(this.player)

        camera.startCameraLoop()



        this.enemies = levelData.entites.filter((x) => x.entityType == "enemy")

        this.end = levelData.entites.filter((x) => x.entityType == "end")[0]

        this.end = new End("end", new Vec3(this.end.pos.x,this.end.pos.y, this.end.pos.z), "level")





        this.entites.push(player)
        const tempPlayerPos = levelData.entites.filter((x) => x.entityType == "player")[0].pos
        this.player.moveTo(new Vec3(tempPlayerPos.x, tempPlayerPos.y, tempPlayerPos.z))








        //loading in the map Image and blocks
        
        if (this.rawBlocks != null) {
            this.rawBlocks.forEach((x) =>  { const a = new Block(new Vec3(x.pos.x, x.pos.y, x.pos.z), x.image); this.blocks.push(a) } )
        }
        if (this.enemies != null) {
            this.enemies.forEach((x) => { const a = new Enemy(x.image, new Vec3(x.pos.x, x.pos.y, x.pos.z)); this.entites.push(a) })
        }
        if (this.items != null) {
            this.items.forEach((x) => { const a = new Item(x.image, new Vec3(x.pos.x, x.pos.y, x.pos.z)); this.entites.push(a) })
        }
        if (levelData.image != null) {
            this.image = add([ sprite(levelData.image), z(1) ])
        }  



        this.objs = [this.player, this.enemies, this.items, this.blocks, this.image]


        levels.set(name, this)


        this.startPlayerMovement()


        //settings the entites z level
        //this.player.getSprite().pos = vec2(width()/2, height()/2)

        //click loop has no use rn
        this.startClickLoop()

    }


    startPlayerMovement() {
        if ( this.playerMovement != undefined ) { this.playerMovement.forEach((x) => x.call()) }
        this.playerMovement = []

        const isMoveKey = (char) => { return (char == "a" || char == "w" || char == "s" || char == "d") }
        const getDir = (char) => {
            const x = char == "a" ? -0.5 : char == "d" ? 0.5 : char == "s" ? 0.5 : char == "w" ? -0.5 : 0
            const y = char == "a" ? 0.5 : char == "d" ? -0.5 : char == "s" ? 0.5 : char == "w" ? -0.5 : 0
            return {x,y}
        }

        const speed = 6

        const dirs = {
            "a": {x: -speed, y: speed},
            "d": {x: speed, y: -speed},
            "w": {x: -speed, y: -speed},
            "s": {x: speed, y: speed}

        }


        for (const [key, value] of Object.entries(dirs)) {
            const a = onKeyDown(key, () => {
                const requestedLocation = Object.assign({}, this.player.getPos().pos)
                requestedLocation.x += value.x * dt(); requestedLocation.z += value.y * dt() 
                //const realBlock = new Vec3(requestedLocation.x, requestedLocation.y, requestedLocation.z)
                const newLocation = new Vec3(requestedLocation.x, requestedLocation.y, requestedLocation.z);

                const movement = new CustomEvent('playerMovement', {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        entity: this.player,
                        from: this.player.getPos(),
                        movement: value,
                        to: requestedLocation,
                        toReal: newLocation.screenPos,
                        level: this
                    }
                });

                if (!document.dispatchEvent(movement)) return;

                this.player.moveTo(newLocation)

            })
            this.playerMovement.push(a)
        }

        // onKeyDown("a", () => {
        //     this.player.moveBy(vec2(-0.5, 0.5))
        // })
        // onKeyDown("d", () => {
        //     this.player.moveBy(vec2(0.5, -0.5))
        // })
        // onKeyDown("s", () => {
        //     this.player.moveBy(vec2(0.5, 0.5))
        // })
        // onKeyDown("w", () => {
        //     this.player.moveBy(vec2(-0.5, -0.5))
        // })


        // this.playerMovement = onCharInput((char) => {
        //     if (!isMoveKey(char)) {return}
        //     const requestedMove = getDir(char)
        //     const requestedLocation = Object.assign({}, this.player.getPos().pos)
        //     requestedLocation.x += requestedMove.x; requestedLocation.z += requestedMove.y
        //     const realBlock = new Vec3(requestedLocation.x, requestedLocation.y, requestedLocation.z)
        //     const newLocation = new Vec3(requestedLocation.x, requestedLocation.y, requestedLocation.z)


        //     const movement = new CustomEvent('playerMovement', {
        //         bubbles: true,
        //         cancelable: true,
        //         detail: {
        //             entity: this.player,
        //             from: this.player.getPos(),
        //             movement: requestedMove,
        //             to: requestedLocation,
        //             level: this
        //         }
        //     });


        //     if (!document.dispatchEvent(movement)) return;

        //     this.player.moveTo(newLocation)
        // })

    }

    stopPlayerMovement() { this.playerMovement.forEach((x) => x.call()) }


    startClickLoop() {
        if (this.clickLoop != null) { this.clickLoop() }

        this.clickLoop = onClick(() => {
            this.lastClickedBlock = screenToGlobal(mousePos().add(camPos().sub(vec2(width()/2, height()/2))))
            if (!this.player.inventory.gui.hidden) return;
            const click = new CustomEvent('customClick', {
                bubbles: true,
                cancelable: true,
                detail: {
                    entity: this.player,
                    from: this.player.getPos(),
                    to: this.lastClickedBlock,
                    mouseVec: mousePos().add(camPos().sub(width()/2, height()/2)),

                    level: this
                }
            });

            if (!document.dispatchEvent(click)) return;

            //if (this.lastClickedBlock.pos.x == this.player.getPos().pos.x && this.lastClickedBlock.pos.y == this.player.getPos().pos.y && this.lastClickedBlock.pos.z == this.player.getPos().pos.z) { this.currentObjectClicked = this.player; return }
            // if (this.currentObjectClicked == this.player) {

            //     const movement = new CustomEvent('movement', {
            //         bubbles: true,
            //         cancelable: true,
            //         detail: {
            //             entity: this.player,
            //             from: this.player.getPos(),
            //             to: this.lastClickedBlock,
            //             level: this
            //         }
            //     });
                
            //     this.currentObjectClicked = null;

            //     if (!document.dispatchEvent(movement)) return;
                
            //     const entity = this.getEntityAt(movement.detail.to)

            //     if (entity[0] != undefined) entity[0].destroy()


            //     this.player.walk(movement.detail.to)
            // }
            
        })

    }

    stopClickLoop() { this.clickLoop() }

    getXat(vec3, y) {
        if (y == undefined) return;
        let result = undefined
        for (let index = 0; index < y.length; index++) {
            const x = y[index];
            if (x == undefined) continue;
            const pos = {x: vec3.pos.x, y: vec3.pos.y, z: vec3.pos.z}
            if (isEqual(x.pos, pos)) { result = x; break}
        }
        return result
    }

    getObjectAt(vec3) { return this.getXat(vec3, this.rawBlocks) }

    getBlockAt(vec3) { return this.blocks.filter((x) => isEqual(x.vec3.pos, vec3)) }

    getEntityAt(vec3) { return this.entites.filter((x) => x.vec3 == this.getXat(vec3, this.entites.map((x) => x.vec3)) ) }

    destroyBlock(vec3) { let block = null; if (vec3.type == "Vec3") { block = this.getBlockAt(vec3) } else { block = vec3}; if (block) {
        block.destroy();
        this.blocks.splice(this.blocks.indexOf(block), 1)
    } }


    // destroyBlock(vec3) { let block = null; if (vec3.x != undefined) { block = this.getBlockAt(vec3) } else { block = vec3}; if (block) {
    //     if (block[0] != undefined) { block = block[0] }
    //     console.log(block)
    //     block.destroy()
    //     this.blocks.splice(this.blocks.indexOf(block), 1)
    // } }

    enable() {

        this.player.startHud()

        this.enabled = true
        this.startPlayerMovement()
        this.startClickLoop()

        camera.startCameraLoop()

        startKeybinds()

    }

    disable() {

        this.player.stopHud()

        this.enabled = false

        this.stopPlayerMovement()
        this.stopClickLoop()

        camera.stopCameraLoop()

        stopKeybinds()

    }


    isEnabled() { return this.enabled }
    isDisabled() { return !this.enabled }
    


    destroy() {
        this.blocks.forEach((x) => { x.destroy() })

        let getIndex = null

        // for (let i = 0; i < this.entites.length; i++) {
        //     if (this.entites[i].type != "enemy") continue

        //     if (getIndex == null) {getIndex = i}
        //     console.log(getIndex)
            
        //      console.log(this.entites[getIndex])
        //     this.entites[getIndex].destroyEnemy()
        // }
        // console.log("HU U OOG", this.entites)
        this.entites.forEach((x) => { if (x.type == "enemy") x.destroyEnemy() } )
        //this.items.forEach((x) => { x.destroyItem(); this.items.splice(this.items.indexOf(x), 1) })
        this.end.destroy()

        this.disable()
        
    }
    

    

}