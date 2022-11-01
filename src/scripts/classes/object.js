import { animations } from "../GlobalVarTracker"

export class GameObject {
    constructor(image, coords, size, options) {

        this.multiplierValue = 64/2 * size
        coords.multiplier(this.multiplierValue)

        this.coords = coords

        this.sprite = add([
            sprite(image),
            scale(size),
            pos(coords.screenPos.x, coords.screenPos.y),
            z(coords.ZLayer)
        ])

        Object.keys(options).forEach((key) => {
            switch(key) {
                case "anim":
                    this.anim(options[key].by, options[key].time)
                    break
                default:
                    console.log("none")
            }
        })

    }

    anim(transform, time) {
        console.log("e")

        if (transform === undefined || time === undefined) { return }
        console.log("d")
        
        //transform.multiplier(1/60 * time)

        animations.set(this, transform)
    }

    move(vec3) {
        const tempCoords = vec3.passiveMultipler()

        console.log(vec3.passiveMultipler())

        delete tempCoords.pos; delete tempCoords.ZLayer
    }

    get GetSprite() { return this.sprite }
}