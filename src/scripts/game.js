import kaboom from "kaboom";
import { GameObject } from "./classes/object"
import { Vec3 } from "./classes/vec3"
import { animationCycle } from "./GlobalVarTracker";

kaboom()

loadSprite("block", "sprites/block.png")

const size = 1.25

new GameObject("block", new Vec3(1,1,1), size, {
    anim: {by: new Vec3(1,0,1), time: 1}  
})
new GameObject("block", new Vec3(2,1,1), size, {hello: "hi"})




onUpdate(() => {
    animationCycle()
})
