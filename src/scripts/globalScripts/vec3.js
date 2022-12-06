
const grid = 25


export class Vec3 {
    constructor(x,y,z) {
        this.pos = { x, y, z }
        this.update()
    }

    multiplier(x) { this.pos.x *= x, this.pos.y *= x, this.pos.z *= x; this.update() }

    add(x,y,z) { this.pos.x += x; this.pos.y += y; this.pos.z += z; this.update() }

    sub(vec3) { this.pos.x -= vec3.pos.x; this.pos.z -= vec3.pos.y; this.pos.z -= vec3.pos.z; this.update() }

    update() {
        this.z = this.pos.x+this.pos.y+this.pos.z
        this.screenPos = {x: ((this.pos.x - this.pos.z) * 32) + (width()/2) - 32 , y: (((this.pos.x + this.pos.z - this.pos.y*2) * 0.5) * 32) + (height()/2) - ((grid + grid) * 8)}
    }

    print() {
        console.log(this.pos)
    }

    //passiveMultipler(x) { return {pos: {x: this.pos.x * x, y: this.pos.y * x, z: this.pos.z * x}, ZLayer: (this.pos.x * x + this.pos.y * x + this.pos.z * x)} }
}


export const screenToGlobal = (vec2) => {
    let mX = vec2.x - (width()/2)
    let mY = vec2.y - (height()/2) + ((grid + grid) * 8)
    mY = ((mX - (mY*2))/-2)
    mX = mX+mY
    const y = Math.floor(Math.floor(mY) / 32)
    const x = Math.floor(Math.floor(mX) / 32)
    return new Vec3(x,0,y)

} 