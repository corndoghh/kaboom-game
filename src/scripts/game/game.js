import kaboom from "kaboom";
import { levelLoader } from "./levelLoader";
import { Level } from "./level"
import { Player } from "./player";
import { loadEvents } from "./events"

kaboom({
    background: [0,0,0]
})

loadSprite("player", "sprites/player.png")

const data = await levelLoader("new_level")

const player = new Player("player")

loadEvents()

const level_one = new Level("level_one", data, player)
