// import { animations } from "../GlobalVarTracker"
// import { tileSize } from "../GlobalVarTracker"


// export class GameObject {
//     constructor(image, coords, options) {
//         this.coords = coords
        
//         this.sprite = add([
//             sprite(image),
//             scale(tileSize/32),
//             pos(coords.screenPos.x, coords.screenPos.y),
//             z(coords.ZLayer)
//         ])

//         Object.keys(options).forEach((key) => {
//             switch(key) {
//                 case "anim":
//                     this.anim(options[key].by, options[key].time)
//                     break
//                 default:
//                     console.log("none")
//             }
//         })

//     }

//     anim(transform, time) {
//         console.log("e")

//         if (transform === undefined || time === undefined) { return }
//         console.log("d")
        
//         transform.multiplier(1/60 * time)

//         animations.set(this, transform)
//     }

//     move(vec3) {

//         this.coords.add(vec3)

//         this.sprite.pos.x = this.coords.screenPos.x
//         this.sprite.pos.y = this.coords.screenPos.y
//         this.sprite.z = this.coords.ZLayer


//     }

//     get GetSprite() { return this.sprite }
// }

export class GameObject {
    constructor(spriteImage, vec3, options) {
        this.spriteImage = spriteImage
        this.vec3 = vec3
        this.options = options

        this.sprite = add([
            sprite(spriteImage),
            pos(vec3.screenPos.x, vec3.screenPos.y),
            scale(tileSize/32),
        ])
    }
}