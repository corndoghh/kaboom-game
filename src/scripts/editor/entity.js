
import { Vec3 } from "../globalScripts/vec3";
import { currentEnity, currentItem } from "./editor";

const entites = new Map()

export class entity {
    constructor(image, globalLocation, entityType) {

        let keys =[ ...entites.keys() ];
        for (let i = 0; i < keys.length; i++) {
            if (isEqual(keys[i], globalLocation.pos)) { return }
        }

        this.image = image
        this.globalLocation = globalLocation;
        this.entityType = entityType
        

        this.sprite = add([
            sprite(image),
            pos(globalLocation.screenPos.x, globalLocation.screenPos.y),
            z(globalLocation.z+2),
            scale(0.07)
            
        ])

        entites.set(globalLocation.pos, this)
    }


}

export const getEntites = () => {return entites}

export const createEntity = (vec3, entityType) => { new entity(currentEnity, vec3, entityType) }
