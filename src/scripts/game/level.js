import { isEqual } from "../globalScripts/functions";
import { screenToGlobal, Vec3 } from "../globalScripts/vec3";
import { Block } from "./block";

const levels = new Map();



export class Level {
    constructor(name, levelData, player, enemies, items, end) {

        //settings class objects
        this.player = player
        this.enemies = enemies
        this.items = items
        this.end = end
        this.name = name
        this.blocks = levelData.blocks
        this.lastClickedBlock = null
        this.currentObjectClicked = null
        this.rawBlocks = levelData.rawBlocks

        this.entites = [player]
        items.forEach((x) => this.entites.push(x))
        enemies.forEach((x) => this.entites.push(x))





        //loading in the map Image and blocks
        if (this.blocks != null) {
            this.blocks.forEach((x) => new Block(new Vec3(x.pos.x, x.pos.y, x.pos.z), x.image))
        }
        if (levelData.image != null) {
            this.image = add([ sprite(levelData.image), z(1) ])
        }  


        this.objs = [this.player, this.enemies, this.items, this.blocks, this.image]


        levels.set(name, this)


        //settings the entites z level
        //this.player.getSprite().pos = vec2(width()/2, height()/2)

        this.startClickLoop()

    }


    startClickLoop() {
        if (this.clickLoop != null) { this.clickLoop() }

        this.clickLoop = onClick(() => {
            this.lastClickedBlock = screenToGlobal(mousePos())
            if (this.lastClickedBlock.pos.x == this.player.getPos().pos.x && this.lastClickedBlock.pos.y == this.player.getPos().pos.y && this.lastClickedBlock.pos.z == this.player.getPos().pos.z) { this.currentObjectClicked = this.player; return }
            if (this.currentObjectClicked == this.player) {

                const movement = new CustomEvent('movement', {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        entity: this.player,
                        from: this.player.getPos(),
                        to: this.lastClickedBlock,
                        level: this
                    }
                });
                
                this.currentObjectClicked = null;

                if (!document.dispatchEvent(movement)) return;
                
                const entity = this.getEntityAt(movement.detail.to)

                if (entity[0] != undefined) entity[0].destroy()


                this.player.walk(movement.detail.to)
            }
            
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

    getEntityAt(vec3) { return this.entites.filter((x) => x.vec3 == this.getXat(vec3, this.entites.filter((x) => x != this.player).map((x) => x.vec3)) ) }

}