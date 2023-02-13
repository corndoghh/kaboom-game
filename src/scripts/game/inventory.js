import { gui } from "../globalScripts/gui";
import { levelManager } from "./game";

export class Inventory extends gui {
    constructor() {
        super([width()*0.8, height()*0.8], [width()/10, height()/10], 0.8, 1000, true, color(105,105,105))

        this.items = new Map()
    }


    open() { this.hideGui(false) }

    close() { this.hideGui(true) }

    toggle() { this.toggleGui() }

    isOpen() { return !this.gui.hidden }

    addItem(item) {
        const image = item.image
        item.destroyItem()
        const size = this.getItems().size
        this.addObj(sprite(image), [20 * (this.getItems().size % 5) + 10, 20 * (Math.floor(this.getItems().size / 5)) + 10], 0.2, () => { levelManager.getPlayer().equipt(size) })
        this.items.set(size, image)
    }

    getItems() { return this.items }

}