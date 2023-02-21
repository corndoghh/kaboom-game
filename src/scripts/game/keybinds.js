import { camera, levelManager } from "./game";

let openInventory = null

export const enabled = true

export const startKeybinds = () => {
    openInventory = onKeyPress("e", () => {
        


        const inventory = new CustomEvent('inventoryEvent', {
            bubbles: true,
            cancelable: true,
            detail: {
                toggle: true
            }
        });

        if (!document.dispatchEvent(inventory)) return;



        
    })

    //remove
    onKeyPress("c", () => {


        camera.stopCameraLoop()
        camPos(width()/2, height()/2)

        levelManager.getPlayer().stopHud()
        levelManager.getPlayer().startHud(true)

        



    })

}


export const stopKeybinds = () => {
    openInventory()
    
}