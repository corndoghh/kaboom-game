import { tileSize } from "../GlobalVarTracker"

export class Vec3 {
    constructor(x,y,z) {
        this.pos = { x, y, z }

        this.update()
    }

    multiplier(x) {this.pos.x *= x, this.pos.y *= x, this.pos.z *= x; this.update() }

    add(vec3) { this.pos.x += vec3.pos.x; this.pos.z += vec3.pos.y; this.pos.z += vec3.pos.z; this.update() }

    sub(vec3) { this.pos.x -= vec3.pos.x; this.pos.z -= vec3.pos.y; this.pos.z -= vec3.pos.z; this.update() }

    update() {
        this.z = this.pos.x+this.pos.y+this.pos.z
        this.screenPos = {x: (this.pos.x - this.pos.z) * tileSize, y: ((this.pos.x + this.pos.z - this.pos.y*2) * 0.5) * tileSize}
    }

    //passiveMultipler(x) { return {pos: {x: this.pos.x * x, y: this.pos.y * x, z: this.pos.z * x}, ZLayer: (this.pos.x * x + this.pos.y * x + this.pos.z * x)} }
}