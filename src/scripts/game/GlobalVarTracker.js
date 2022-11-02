export const animations = new Map()
export const tileSize = 32 * 1


export const animationCycle = () => {
    console.log("c")

    animations.forEach((value, key) => {
        //value.transform.multiplier(1/60 * value.time)
        key.move(value)
    })

}