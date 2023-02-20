import { Vec3 } from "../globalScripts/vec3"
import { gui } from "../globalScripts/gui"
import { camera } from "./game"
import { Level } from "./level"
import { levelLoader } from "./levelLoader"
import { Player } from "./player"
import { boxInput } from "../globalScripts/functions"


export class LevelManager {

    constructor(name) {
        this.name = name
        this.currentLevel = null
        this.player = new Player("player")
        this.levelName = null
    }


    async loadLevel(levelName) {
        this.levelName = levelName
        const data = await levelLoader(levelName)
        const level = new Level(levelName, data, this.player)
        this.currentLevel = level
    }

    destroyLevel() {
        this.currentLevel.destroy()
    }

    changeLevel(level) {
        camPos(width()/2, height()/2)
        const loading = new gui([width(), height()], [0,0], 1, 100, false, color(50,50,50))
        loading.addObj(text("Loading...", {font: "sink", size: 52}), [50,50], 2, () => {})
        this.destroyLevel()
        camPos(width()/2, height()/2)
        this.loadLevel(level)
        wait(0.5, () => {
            loading.remove()
        })
        
    }


    async attack(enemy) {
        
        const enemyStateCopy = {
            pos: enemy.vec3,
            size: enemy.sprite.scale
        }

        this.getCurrentLevel().disable()
        enemy.stopMovementLoop()

        this.getCurrentLevel().disable()
        camPos(width()/2, height()/2)

        
        const lastPlayerPos = this.player.vec3
        console.log("GHEHHEEH,",lastPlayerPos)
        const attack = new gui([width(), height()], [0,0], 1, 200, false, color(50,50,50))

        attack.addObj(text("Fight Loading...", {font: "sink", size: 52}), [50,50], 2, () => {})

        await wait(3, () => {});
        [...attack.objs.keys()].forEach((x) => x.destroy());




        //8 25
        enemy.moveTo(new Vec3(-15,0,15))
        enemy.sprite.scale = 0.5
        enemy.walk(new Vec3(6,0,23), true, () => {enemy.sprite.z = 202})

        //8, 0, 0
        this.getPlayer().moveTo(new Vec3(25, 0, 0))
        this.getPlayer().walk(new Vec3(8, 0, 0), true, () => {this.getPlayer().sprite.z = 202})

        this.player.sprite.z = 201

        await wait(2, () => {})

        shake()

        const ready = text("Ready", {font: "sink", size: 36})
        attack.addObj(ready, [50,50], 2, () => {});



        await wait(1.5, () => {});

        [...attack.objs.keys()].forEach((x) => x.destroy());

        shake()


        attack.addObj(text("Fight", {font: "sink", size: 52}), [50,50], 2, () => {})

        await wait(1.2, () => {});
        [...attack.objs.keys()].forEach((x) => x.destroy());


        const question = [Math.floor(Math.random() * 20), ["+", "-", "*"][Math.floor(Math.random() * 2)], Math.floor(Math.random() * 20)]

        const answer = question[1] == "+" ? question[0] + question[2] : question[1] == "-" ? question[0] - question[2] : question[0] * question[1]

        //const data = await new Promise( async (resolve, _reject) => {
        const data = await boxInput(text("Answer", {font: "sink"}), text("What is " + question[0] + " " + question[1] + " " + question[2] + "?"), [0,0,0,0.9], true)       


        shake()

        await wait(0.5, () => {})



        if (parseInt(data) == answer) {
            console.log("pineAPPLE")
            enemy.destroyEnemy()
            this.getPlayer().score+=5


        } else {
            this.getPlayer().score-=4

            this.getPlayer().damage()

            enemy.sprite.scale = enemyStateCopy.size
            enemy.moveTo(enemyStateCopy.pos)

            enemy.startMovementLoop()

            enemy.lastCoolDown = time()+2

        }


        this.getPlayer().moveTo(lastPlayerPos)

        this.getCurrentLevel().enable()

        attack.remove()
        


        

    }


    getCurrentLevel() { return this.currentLevel }

    getBlocks() { return this.currentLevel.rawBlocks }
    getPlayer() { return this.player }

}
