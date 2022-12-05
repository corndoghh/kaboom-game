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


const data = await levelLoader("new_level")

const player = new Player("player")
const item = new Item("pick")
new Item("axe")
new Item("bow")




loadEvents()

const level_one = new Level("level_one", data, player, [], [item])
