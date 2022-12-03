import { toggleReal } from "./editor";
import { isEqual } from "../globalScripts/functions";

const blocks = new Map()

const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };
  




class block {
    constructor(image, globalLocation, real) {

        let keys =[ ...blocks.keys() ];
        for (let i = 0; i < keys.length; i++) {
            if (isEqual(keys[i], globalLocation.pos)) { return }
        }

        this.image = image
        this.globalLocation = globalLocation;
        this.real = real;
        

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

export const isOccupied = (coords) => {
    let returnVal = false;
    let keys = [...blocks.keys()]
    //console.log(keys)
    for (let i = 0; i < keys.length; i++) {
        console.log(coords.pos)
        if (isEqual(keys[i], coords.pos)) { returnVal = true; console.log(keys[i], coords); break; }
    }
    return returnVal
}

export const createObject = (vec3) => { new block("block", vec3, toggleReal) }

export const saveLevel = (session) => {

    const blocksValues = [...blocks.values()];

    blocksValues.forEach((e) => {
        if (e.real) { e.sprite.opacity = 0 } else { e.sprite.opacity = 1 }
    })


    const rawBlockData = blocksValues.map((ob) => { return {pos: ob.globalLocation.pos, image: ob.image, real: ob.real}})

    const savedBlocks = rawBlockData.filter((x) => x.real)


    console.log(rawBlockData, savedBlocks)

    wait (0.1, () => {
        fetch('/save', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({session, image: screenshot(), blocks: savedBlocks, rawBlockData }, getCircularReplacer())
        })
        .then(blocksValues.forEach((e) => {
            e.sprite.opacity = 1 
         }))
    });


}