
import { Vec3 } from "../game/classes/vec3";

const blocks = new Map()


function isEqual(obj1, obj2) {
    var props1 = Object.getOwnPropertyNames(obj1);
    var props2 = Object.getOwnPropertyNames(obj2); if (props1.length != props2.length) {
        return false;
    }    for (var i = 0; i < props1.length; i++) {
        let val1 = obj1[props1[i]];
        let val2 = obj2[props1[i]];
        let isObjects = isObject(val1) && isObject(val2); if (isObjects && !isEqual(val1, val2) || !isObjects && val1 !== val2) {
            return false;
        }
    }
    return true;
}function isObject(object) {
  return object != null && typeof object === 'object';
}


class block {
    constructor(image, globalLocation) {

        let keys =[ ...blocks.keys() ];
        for (let i = 0; i < keys.length; i++) {
            if (isEqual(keys[i], globalLocation.pos)) { return }
        }

        this.image = image
        this.globalLocation = globalLocation;

        this.sprite = add([
            sprite(image),
            pos(globalLocation.screenPos.x, globalLocation.screenPos.y),
            z(globalLocation.z)
            
        ])

        blocks.set(globalLocation.pos, this)
    }

}

// export const generateBoard = () => {
//     for (let i = 0; i < 25; i++) {
//         for (let j = 0; j < 25; j++) {
//             new block("block", new Vec3(i,(1/i-1/j),j))
//         } 
//     } 
// }

export const destroyObject = (vec3) => {
    let keys =[ ...blocks.keys() ];
    let block = undefined
    for (let i = 0; i < keys.length; i++) {
        if (isEqual(keys[i], vec3.pos)) { block = {f: blocks.get(keys[i]), s: keys[i]}; break;}
    }
    if (block === undefined) { return; }
    //console.log("a")
    block.f.sprite.destroy()    
    block.f = null
    blocks.delete(block.s)
    
}

export const updateBlockOpacity = (yLevel, opacity) => {
    let keys =[...blocks.keys()]
    for (let i = 0; i < keys.length; i++) {
        console.log(keys[i].y)
        if (keys[i].y <= yLevel-1) { blocks.get(keys[i]).sprite.opacity = 0; continue }  
        if (keys[i].y == yLevel) { blocks.get(keys[i]).sprite.opacity = opacity }
    }
}

export const createObject = (vec3) => { new block("block", vec3) }

export const saveLevel = () => {

    const savedBlocks = [];


    [ ...blocks.values() ].forEach((ob) => {
        savedBlocks.push({pos: ob.globalLocation, image: ob.image})
    })

    fetch('/save', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(savedBlocks)
})
.then(response => response.json())
.then(response => console.log(JSON.stringify(response)))


}