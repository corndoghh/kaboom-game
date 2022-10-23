import { GTSCoords } from "../world"

export class Object {
    constructor(image, spawningCoords, size) {

        this.coords = {
            x: spawningCoords.x,
            y: spawningCoords.y,
            z: spawningCoords.z
        }

        const ScreenCoords = GTSCoords(this.coords.x, this.coords.y, this.coords.z, 64/2 * size)

        this.sprite = add([
            sprite(image),
            scale(size),
            pos(ScreenCoords.x, ScreenCoords.y),
            z(this.coords.y)
        ])

    }

    get GetSprite() { return this.sprite }
}