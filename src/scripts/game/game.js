import kaboom from "kaboom";
import { levelLoader } from "./levelLoader";
import { Level } from "./level"
import { Player } from "./player";
import { loadEvents } from "./events"
import { Item } from "./item";
import { Camera } from "./camera";

kaboom({
    background: [0,0,0]
})

await loadSprite("player", "sprites/player.png")
await loadSprite("enemy", "sprites/enemy.png")
await loadSprite("grass", "sprites/grass.png")


await loadSprite("pick", "sprites/items/pick.png")
await loadSprite("axe", "sprites/items/axe.png")
await loadSprite("bow", "sprites/items/bow.png")
await loadSprite("tile", "sprites/snow.png")
await loadSound("rock", "sounds/rock.mp3")


loadSprite("bad", "sprites/bad.png")



const data = await levelLoader("test")

const player = new Player("player")
// const item = new Item("pick", [6,0,27])
// const a = new Item("axe", [5,0,10])
// const b = new Item("bow", [7,0,20])




loadEvents()

export const level_one = new Level("level_one", data, player)

export const camera = new Camera(level_one, player)

document.title = "8-Bit Adventure"
