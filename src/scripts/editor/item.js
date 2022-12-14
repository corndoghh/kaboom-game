
import { Vec3 } from "../globalScripts/vec3";
import { currentItem } from "./editor";

const items = new Map()

export class item {
    constructor(image, globalLocation) {

        let keys =[ ...items.keys() ];
        for (let i = 0; i < keys.length; i++) {
            if (isEqual(keys[i], globalLocation.pos)) { return }
        }

        this.image = image
        this.globalLocation = globalLocation;
        

        this.sprite = add([
            sprite(image),
            pos(globalLocation.screenPos.x, globalLocation.screenPos.y),
            z(globalLocation.z+2),
            scale(0.07)
            
        ])

        items.set(globalLocation.pos, this)
    }


}

export const getItems = () => {return items}

export const createItem = (vec3) => { new item(currentItem, vec3) }
