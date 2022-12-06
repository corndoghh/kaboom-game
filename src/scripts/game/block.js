export class Block {
    constructor(vec3, image) {
        this.sprite = add([
            sprite(image),
            pos(vec2(vec3.screenPos.x, vec3.screenPos.y)),
            z(vec3.z)
        ])
                
    }
}

//0,0,8
//9,0,28