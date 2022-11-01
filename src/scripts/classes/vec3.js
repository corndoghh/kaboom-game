export class Vec3 {
    constructor(x,y,z) {
        this.pos = {
            x, y, z
        }
        this.update()
    }

    update() {
        this.ZLayer = this.pos.x+this.pos.y+this.pos.z
        this.screenPos = {x: (this.pos.x - this.pos.z), y: ((this.pos.x + this.pos.z - this.pos.y*2) * 0.5)}
    }

    multiplier(x) { console.log("fuck "+ this.pos.x) ;this.pos.x *= x, this.pos.y *= x, this.pos.z *= x; this.update() }

    passiveMultipler(x) { return {pos: {x: this.pos.x * x, y: this.pos.y * x, z: this.pos.z * x}, ZLayer: (this.pos.x * x + this.pos.y * x + this.pos.z * x)} }
}