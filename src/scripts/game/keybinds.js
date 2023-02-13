import { camera } from "./game";

let openInventory = null

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

    })

}


export const stopKeybinds = () => {
    openInventory()
    
}