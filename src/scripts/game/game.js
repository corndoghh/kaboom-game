import kaboom from "kaboom";
import { levelLoader } from "./levelLoader";
import { Level } from "./level"
import { Player } from "./player";
import { loadEvents } from "./events"
import { Item } from "./item";

kaboom({
    background: [0,0,0]
})

loadSprite("player", "sprites/player.png")
loadSprite("pick", "sprites/pick.png")
loadSprite("axe", "sprites/axe.png")
loadSprite("bow", "sprites/bow.png")

loadSprite("bad", "sprites/bad.png")



const data = await levelLoader("new_level")

const player = new Player("player")
const item = new Item("pick", [6,0,27])
const a = new Item("axe", [5,0,10])
const b = new Item("bow", [7,0,20])




loadEvents()

const level_one = new Level("level_one", data, player, [], [item,a,b])
