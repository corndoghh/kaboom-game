
//converts global coords to screen coords
export const GTSCoords = (x, y, z, multiplier) => {
    return {
        x: (x - z) * multiplier,
        y: ((x + z - y*2) * 0.5) * multiplier
    }
} 