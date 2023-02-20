
export const boxInput = async (boxText, title, colour = [0,0,0,0.5], isPlaceholder = false, coords = [width()/2, height()/2], rectSize = [400,150]) => {

    if (boxText.textSize == undefined) { boxText.textSize = rectSize[0] /  10}
    if (title.textSize == undefined) { title.textSize = rectSize[0] /  20}
    if (boxText.font == undefined) { boxText.font = "sink" }
    if (title.font == undefined) { title.font = "sink" }

    const box = add([
        rect(rectSize[0], rectSize[1]),
        color(colour[0], colour[1], colour[2]),
        opacity(colour[3]),
        outline(5, new Color(Math.abs(colour[0] - 255), Math.abs(colour[1] - 255), Math.abs(colour[2] - 255))),
        origin("center"),
        pos(coords[0], coords[1]),
        z(300)
    ])

    const titleText = add([
        title,
        origin("center"),
        pos(coords[0], coords[1] - box.height / 2 + title.textSize),
        z(302)
    ])


    const outlineBox = add([
        rect(rectSize[0] - 40, boxText.textSize + 20),
        pos(coords[0], coords[1] + title.textSize /2 ),
        origin("center"),
        opacity(0),
        outline(1, new Color(Math.abs(colour[0] - 255), Math.abs(colour[1] - 255), Math.abs(colour[2] - 255))),

        z(303)
    ])


    const textField = add([
        boxText,
        origin("center"),
        pos(coords[0], coords[1] + title.textSize / 2 ),
        opacity(isPlaceholder ? 0.5 : 1),
        z(301)

    ])

    const result = await new Promise((r, _j) => {
        let returnText = ""
        let placeholder = isPlaceholder ? "" : textField.text
        onKeyPress("backspace", () => { returnText = returnText.substring(0, returnText.length - 1); textField.text = placeholder + returnText  })

        onCharInput((char) => {
            onKeyPress("enter", () => { r(returnText) })
            returnText += char
            textField.text = placeholder + returnText 
        })

    })

    box.destroy()
    titleText.destroy()
    outlineBox.destroy()
    textField.destroy()

    
    return result
    
}

export const rawInput = async (textBox) => {
    return new Promise((r, _j) => {
        let inputVal = ""
        onCharInput((char) => {
            onKeyPress("enter", () => { r(inputVal) })
            inputVal += char; textBox.text = inputVal;
        })
    })
}

export function isEqual(obj1, obj2) {
    var props1 = Object.getOwnPropertyNames(obj1);
    var props2 = Object.getOwnPropertyNames(obj2); if (props1.length != props2.length) {
        return false;
    }    for (var i = 0; i < props1.length; i++) {
        let val1 = obj1[props1[i]];
        let val2 = obj2[props1[i]];
        let isObjects = isObject(val1) && isObject(val2); if (isObjects && !isEqual(val1, val2) || !isObjects && val1 !== val2) {
            return false;
        }
    }
    return true;
}function isObject(object) {
  return object != null && typeof object === 'object';
}