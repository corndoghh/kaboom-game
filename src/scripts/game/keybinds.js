export const startKeybinds = () => {
    const openInventory = onKeyPress("e", () => {

        const inventory = new CustomEvent('inventoryEvent', {
            bubbles: true,
            cancelable: true,
            detail: {
                toggle: true
            }
        });

        if (!document.dispatchEvent(inventory)) return;



        
    })
}