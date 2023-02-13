import { gui } from "../globalScripts/gui"
import { camera } from "./game"
import { Level } from "./level"
import { levelLoader } from "./levelLoader"
import { Player } from "./player"


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

    getCurrentLevel() { return this.currentLevel }

    getBlocks() { return this.currentLevel.rawBlocks }
    getPlayer() { return this.player }

}
