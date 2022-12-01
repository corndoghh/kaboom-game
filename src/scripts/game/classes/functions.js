export const boxInput = (rectSize, colour, boxSize, boxText, isPlaceholder) => {
    const box = add([
        rect(rectSize[0], rectSize[1]),
        color(colour),
        size(boxSize),
        text(boxText),
    ])
    
}

export const rawInput = async (textBox) => {
    return new Promise((r, _j) => {
        let inputVal = ""
        onCharInput((char) => {
            onKeyPress("enter", () => { r(inputVal) })
            inputVal += char; textBox = inputVal;
        })
    })
}