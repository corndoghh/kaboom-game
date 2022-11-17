

export class gui {
    constructor(rect2, pos2, opacity2, hidden, f) {
        this.gui = add([
            pos(pos2[0], pos2[1]),
            rect(rect2[0], rect2[1]),
            outline(1),
            z(99),
            opacity(opacity2)
        ])
        this.gui.hidden = hidden

    }

    toggleGui() { this.gui.hidden = !this.gui.hidden }

    clicked(vec2) {
        if (vec2.x < this.gui.pos.x)
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
