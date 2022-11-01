import kaboom from "kaboom";
import { GameObject } from "./classes/object"
import { Vec3 } from "./classes/vec3"
import { animationCycle, tileSize } from "./GlobalVarTracker";

kaboom()

loadSprite("block", "sprites/block.png")

// const ob = new GameObject("block", new Vec3(1,1,1), {
//     anim: {by: new Vec3(1,0,1), time: 1}  
// })
// const ob2 = new GameObject("block", new Vec3(2,1,1), {hello: "hi"})
console.log(new Vec3(1,1,1))
console.log(new Vec3(1,0,1))
console.log(new Vec3(0,1,1))



// add([
//     sprite("block"),
//     pos(new Vec3(1,0,-1).screenPos.x,new Vec3(1,0,-1).screenPos.y),
//     z(new Vec3(1,0,-1).z),
//     scale(tileSize/32)
// ])
// add([
//     sprite("block"),
//     pos(new Vec3(0,-1,-1).screenPos.x,new Vec3(0,-1,-1).screenPos.y),
//     z(new Vec3(0,-1,-1).z),
//     scale(tileSize/32)

// ])





