
export const inRegion = (target, vec2, optional) => {
    if (optional === undefined) { optional = true; }
        // console.log(
        //     vec2.x >= target.pos.x,
        //     vec2.x <= target.pos.x + target.width,
        //     vec2.y >= target.pos.y,
        //     vec2.y <= target.pos.y + target.height
        // ) 
    return (vec2.x >= target.pos.x && vec2.x <= target.pos.x + target.width && vec2.y >= target.pos.y && vec2.y <= target.pos.y + target.height) && optional
}
// ) 


export class gui {
    constructor(rect2, pos2, opacity2, z1, hidden, colour) {
        this.gui = add([
            pos(pos2[0], pos2[1]),
            rect(rect2[0], rect2[1]),
            outline(1),
            z(z1),
            colour,
            opacity(opacity2)
        ])
        this.gui.hidden = hidden
        this.layers = new Map()
        this.objs = new Map()
        this.layers.set("gui", this.gui)
        this.gui.objs = []

        onClick(() => {
            if (!this.clicked(mousePos())) { return }

            [...this.objs.keys()].filter((x) => !x.hidden).forEach((e) => {
                const e2 = {pos: {x: e.pos.x - e.width/2, y: e.pos.y - e.height/2 }, width: e.width, height: e.height }
                if (inRegion(e2, mousePos())) { this.objs.get(e).call() }
            })
        })
    }

    clicked(vec2) {
        return inRegion(this.gui, vec2, !this.gui.hidden)
    }

    addLayer(name, rectSize, coords, colour, outline, zLayer) {
        const layer = add([
            pos((this.gui.width * coords[0] / 100) + this.gui.pos.x, (this.gui.height * coords[1] / 100) + this.gui.pos.y),
            rect((this.gui.width * rectSize[0] / 100), (this.gui.height * rectSize[1] / 100)),
            colour,
            outline,
            z(zLayer),
            origin("center"),
        ])
        layer.objs = []
        this.layers.set(name, layer)
    } 

    isLayerHidden(layer) { return this.layers.get(layer).hidden }


    hideLayer(layer, bool) {
        this.layers.get(layer).hidden = bool;
        this.layers.get(layer).objs.forEach((x) => x.hidden = bool)
    }


    hideGui(bool) {this.gui.hidden = bool; [...this.objs.keys()].forEach((e) => e.hidden = this.gui.hidden); [...this.layers.values()].forEach((e) => e.hidden = this.gui.hidden)}
    

    toggleGui() { this.hideGui(!this.gui.hidden) }

    addObjFull(obj ,functionCall, parentLayer = "gui") {
        const layer = this.layers.get(parentLayer)
        const percentage = [obj.pos.x, obj.pos.y]
        obj.pos.x = (layer.width * obj.pos.x / 100) + layer.pos.x// + obj.width*obj.scale/2
        obj.pos.y = (layer.height * obj.pos.y / 100) + layer.pos.y //+ obj.height*obj.scale/2
        obj.hidden = layer.hidden
        if (percentage[1] > 100) {
            console.log("out")
        }
        this.objs.set(
            obj, functionCall
        )
        layer.objs.push(obj)

    }


    addObj(displayed, relativePos, scale, functionCall, parentLayer = "gui") {   
        const layer = this.layers.get(parentLayer)
        console.log(layer)
        const obj = add([
            displayed,
            pos(relativePos[0], relativePos[1]),
            origin("center"),
            z(layer.z+1),
            area()            
        ])
        console.log(obj.pos)
        obj.scale = scale
        wait(0.01, () => {
            obj.width *= scale
            obj.height *= scale
            this.addObjFull(obj, functionCall, parentLayer)

        })

    }

    remove() {
        this.gui.destroy();

        [...this.objs.keys()].forEach((x) => x.destroy());
        [...this.layers.values()].forEach((x) => x.destroy())
    }
}




// let gui = undefined

// export const loadGui = () => {
//     gui = add([
//         pos(20, 20),
//         rect(width() - 40, 120),
//         outline(1),
//         z(99),
//         opacity(0.5)
//     ])
//     gui.hidden = true
    

// }

// export const toggleGui = () => { gui.hidden = !gui.hidden }
