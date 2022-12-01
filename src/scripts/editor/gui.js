
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
    constructor(rect2, pos2, opacity2, z1, hidden) {
        this.gui = add([
            pos(pos2[0], pos2[1]),
            rect(rect2[0], rect2[1]),
            outline(1),
            z(z1),
            opacity(opacity2)
        ])
        this.gui.hidden = hidden
        this.objs = new Map()

        onClick(() => {
            if (!this.clicked(mousePos())) { return }

            [...this.objs.keys()].forEach((e) => {
                const e2 = {pos: {x: e.pos.x - e.width/2, y: e.pos.y - e.height/2 }, width: e.width, height: e.height }
                if (inRegion(e2, mousePos())) { this.objs.get(e).call() }
            })
        })
    }

    clicked(vec2) {
        return inRegion(this.gui, vec2, !this.gui.hidden)
    }

    

    toggleGui() { this.gui.hidden = !this.gui.hidden; [...this.objs.keys()].forEach((e) => e.hidden = this.gui.hidden) }


    addObj(displayed, relativePos, scale, functionCall, isText) {
        if (isText == undefined) { isText = false; }
    
        console.log(displayed)
        const obj = add([
            displayed,
            pos((this.gui.width * relativePos[0] / 100) + this.gui.pos.x, (this.gui.height * relativePos[1] / 100) + this.gui.pos.y),
            origin("center"),
            z(this.gui.z+1),
            area()            
        ])
        console.log(obj.pos)
        obj.hidden = this.gui.hidden
        obj.scale = scale
        wait(0.1, () => {
            obj.width *= 0.2
            obj.height *= 0.2

        })


        this.objs.set(
            obj, functionCall
        )

    }

    remove() {
        this.gui.destroy();

        [...this.objs.keys()].forEach((x) => x.destroy())
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
