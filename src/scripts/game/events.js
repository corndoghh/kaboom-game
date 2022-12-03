export const loadEvents = () => {
    document.addEventListener("movement", (e) => {

        //void check
        if (!e.detail.level.getObjectAt(e.detail.to)) {
            e.preventDefault()
        }

    })
}

