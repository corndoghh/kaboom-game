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

                this.player.move(movement.detail.to)
            }
            
        })

    }

    stopClickLoop() { this.clickLoop() }

    getObjectAt(vec3) {
        let result = undefined
        for (let index = 0; index < this.rawBlocks.length; index++) {
            const x = this.rawBlocks[index];
            const pos = {x: vec3.pos.x, y: vec3.pos.y, z: vec3.pos.z}
            if (isEqual(x.pos, pos)) { result = x }
            
        }
        return result
    }

}