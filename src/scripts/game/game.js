import kaboom from "kaboom";
import { levelLoader } from "./levelLoader";
import { Level } from "./level"
import { Player } from "./player";
import { loadEvents } from "./events"
import { Item } from "./item";
import { Camera } from "./camera";
import { LevelManager } from "./levelManager";
import { gui } from "../globalScripts/gui";

kaboom({
    background: [0,0,0]
})

await loadSprite("player", "sprites/player.png")
await loadSprite("enemy", "sprites/enemy.png")
await loadSprite("grass", "sprites/grass.png")
await loadSprite("end", "sprites/end.png")



await loadSprite("pick", "sprites/items/pick.png")
await loadSprite("axe", "sprites/items/axe.png")
await loadSprite("bow", "sprites/items/bow.png")
await loadSprite("tile", "sprites/snow.png")
await loadSound("rock", "sounds/rock.mp3")


loadSprite("bad", "sprites/bad.png")





// const item = new Item("pick", [6,0,27])
// const a = new Item("axe", [5,0,10])
// const b = new Item("bow", [7,0,20])


loadSprite("snow", "sprites/snow.png")

loadEvents()



export const levelManager = new LevelManager("manager")

export const camera = new Camera(levelManager.getPlayer())

await levelManager.loadLevel("test")



document.title = "8-Bit Adventure"



levelManager.getCurrentLevel().disable()

camPos(width()/2, height()/2)


const guide = new gui([width() - 50, height() - 50], [25,25], 0.9, 100, false, color(50,50,60)) 
guide.addLayer("guide", [50, 80], [50, 50], outline(1, new Color(44, 45, 47)), color(44, 45, 47), 105)
guide.addLayer("guide2", [50, 80], [50, 50], outline(1, new Color(44, 45, 47)), color(44, 45, 47), 105)
guide.addLayer("guide3", [50, 80], [50, 50], outline(1, new Color(44, 45, 47)), color(44, 45, 47), 105)


guide.hideLayer("guide", true)
guide.hideLayer("guide2", true)
guide.hideLayer("guide3", true)



//Text components 
//( Very boilerplaty sorry text handeling looks better in other parts of the code look there instead :p )

//1
guide.addObj(
    text("8-Bit Adventures", {font: "sink", size: 48}),
    [0,-35],
    1,
    () => {},
    "guide",
)
guide.addObj(
    text("an Isometric Dungeon Crawler game!", {font: "sink", size: 12}),
    [0,-27],
    1,
    () => {},
    "guide",
    color(100,100,100)
)
guide.addObj(
    text("Your Mission:", {font: "sink", size: 36}),
    [-1,-7],
    1,
    () => {},
    "guide",
    color(200,200,200)
)
guide.addObj(
    text("-Beat at least half the enemies in each level to progress\n\n\n\n-Answer a fun maths question at the end of each level to continue\n\n\n\n-Beat all three levels to win!", {font: "sink", size: 16}),
    [0,18],
    1,
    () => {},
    "guide",
)

//2
guide.addObj(
    text("Score Points:", {font: "sink", size: 36}),
    [-1,-35],
    1,
    () => {},
    "guide2",
    color(200,200,200)
)
guide.addObj(
    text("-You can earn points for how quickly you beat each level:\n\n\n\n-10 points if you finish in less than 30 seconds\n\n\n\n-5 points if you finish in less than 45 seconds\n\n\n\n-2 points if you finish in less than 60 seconds\n\n\n\n-No points if you take more than 60 seconds\n\n\n\n-You can also earn points for each enemy you defeat:\n\n\n\n-Each enemy defeated is worth 5 points!", {font: "sink", size: 16}),
    [0,5],
    1,
    () => {},
    "guide2",
)



//3
guide.addObj(
    text("How to Play:", {font: "sink", size: 36}),
    [-1,-35],
    1,
    () => {},
    "guide3",
    color(200,200,200)
)
guide.addObj(
    text("-Use the WASD keys to move around\n\n\n\n-Walk over items to pick them up\n\n\n\n-Press "+`"E"`+" to open your inventory\n\n\n\n-Click on an item in your inventory to equip it\n\n\n\n-Click on a block with the pickaxe to break it\n\n\n\n-Get close to an enemy and click on them with a axe to attack\n\n\n\n-Click on an enemy with a bow to shoot at them from a distance", {font: "sink", size: 16}),
    [0,5],
    1,
    () => {},
    "guide3",
)







//button controls ( I really want to make it more efficient but ig it works )
guide.addObj(
    text("Next", {font: "sink", size: 24}),
    [40,40],
    1,
    () => {guide.hideLayer("guide2", false); guide.hideLayer("guide", true)},
    "guide",
)
guide.addObj(
    text("Back", {font: "sink", size: 24}),
    [-40,40],
    1,
    () => {},
    "guide",
    color(100,100,100)
)
guide.addObj(
    text("Next", {font: "sink", size: 24}),
    [40,40],
    1,
    () => {guide.hideLayer("guide3", false); guide.hideLayer("guide2", true)},
    "guide2",
)
guide.addObj(
    text("Back", {font: "sink", size: 24}),
    [-40,40],
    1,
    () => {guide.hideLayer("guide", false); guide.hideLayer("guide2", true)},
    "guide2",
)
guide.addObj(
    text("Next", {font: "sink", size: 24}),
    [40,40],
    1,
    () => {},
    "guide3",
    color(100,100,100)
)
guide.addObj(
    text("Back", {font: "sink", size: 24}),
    [-40,40],
    1,
    () => {guide.hideLayer("guide2", false); guide.hideLayer("guide3", true)},
    "guide3",
)

//Ughhh the repetition

guide.addObj(text("Welcome to 8-Bit Adventures", {font: "sink", size: 52}), [50,10], 1, () => {})
guide.addObj(text("Start", {font: "sink", size: 52}), [50,35], 1, () => {
    guide.remove()
    levelManager.getCurrentLevel().enable()
})
guide.addObj(text("How to play", {font: "sink", size: 52}), [50,60], 1, () => {
    guide.hideLayer("guide", false)
    const cancel = onKeyPress("escape", () => {
        guide.hideLayer("guide", true)  
        guide.hideLayer("guide2", true)  
        guide.hideLayer("guide3", true)  
        cancel()
    })


})
