import { gui } from "../globalScripts/gui";
import { level_one } from "./game";
import { Item } from "./item";

export class Inventory extends gui {
    constructor() {
        super([width()*0.8, height()*0.8], [width()/10, height()/10], 0.8, 1000, true, color(105,105,105))
    }


    open() { this.hideGui(false) }

    close() { this.hideGui(true) }

    toggle() { this.toggleGui() }

    isOpen() { return !this.gui.hidden }

    addItem(item) {
        const image = item.image
        item.destroyItem()
        this.addObj(sprite(image), [10, 10], 0.2, () => { level_one.player.equipt(sprite) } )

        console.log(this.getItems().size, sprite)
    }

    getItems() { return this.objs }

}