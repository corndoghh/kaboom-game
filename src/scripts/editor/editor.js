import kaboom from "kaboom";

kaboom({
    background: [ 0, 0, 0, ]
})

const YLevel = 0

const gridSize = {x: 50, y: 3}


const drawGridSquare = (dX, dY) => {
    const x = ((dX - dY) * 32) + (width()/2) + ((gridSize.y - gridSize.x) * 16 )
    const y = (((dX + dY) * 0.5) * 32) + (height()/2 + 32) - ((gridSize.y + gridSize.x) * 8)

    // if (dX - dY == 0) {
    //     console.log(x,y)
    // }

    //(this.pos.x - this.pos.z) * tileSize, y: ((this.pos.x + this.pos.z - this.pos.y*2) * 0.5) * tileSize

    //const topPoint = y - 32 

    drawLine({
        p1: vec2(x, y),
        p2: vec2(x + 32, y - 16),
        color: rgb(0, 0, 255),
    })
    drawLine({
        p1: vec2(x + 32, y - 16),
        p2: vec2(x, y - 32),
        color: rgb(0, 0, 255),
    })
    drawLine({
        p1: vec2(x, y - 32),
        p2: vec2(x - 32, y - 16),
        color: rgb(0, 0, 255),
    })
    drawLine({
        p1: vec2(x - 32, y - 16),
        p2: vec2(x, y),
        color: rgb(0, 0, 255),
    })

} 

onDraw(() => {
    let count = 0
    for (let i = 0; i < gridSize.y; i++) {
        for (let j = 0; j < gridSize.x; j++) {
            drawGridSquare(j, i)
            count++;
        }
        //drawGridSquare(i, -i)
    }
    // console.log(count)



    // // drawGridSquare(0,0)
    // // drawGridSquare(2,-2)


    // drawGridSquare(1,-1)
    // drawGridSquare(1,1)
    // drawGridSquare(1,0)

    // drawGridSquare(2,-1)
    // drawGridSquare(2,1)
    // drawGridSquare(2,0)




    // 0 -1 
    
    // drawGridSquare(1.5, 1.5)
    drawLine({
        p1: vec2(width()/2, height()/2),
        p2: vec2(width()/2, 0),
        color: rgb(0, 0, 255),
    })
    drawLine({
        p1: vec2(width()/2, height()/2),
        p2: vec2(width()/2, height()),
        color: rgb(0, 0, 255),
    })
    drawLine({
        p1: vec2(width()/2, height()/2),
        p2: vec2(0, height()/2),
        color: rgb(0, 0, 255),
    })
    drawLine({
        p1: vec2(width()/2, height()/2),
        p2: vec2(width(), height()/2),
        color: rgb(0, 0, 255),
    })
    // drawLine({
    //     p1: vec2(32, 0),
    //     p2: vec2(0, 16),
    //     color: rgb(0, 0, 255),
    // })
})

let clickedPos = vec2(0)

onUpdate(() => {

    if (!isKeyDown("shift")) { 
        if (isMouseDown()) {
            let mX = mousePos().x - (width()/2) - ((gridSize.y - gridSize.x) * 16 )
            let mY = mousePos().y - (height()/2 + 32) + ((gridSize.y + gridSize.x) * 8)

            const y = ((mX - (mY*2))/-2)
            const x = mX+y
            console.log(x / 32, y / 32)

        }
        return
     } 

    onClick(() => {
        clickedPos = mousePos()
    })
    
    
    
    if (isMouseDown()) {
        const newVec = clickedPos.sub(mousePos())
        clickedPos = mousePos()
        camPos(camPos().add(newVec.scale(1/camScale().x)))
        //camPos(mousePos().x, -mousePos().y)
        // drawLine({
        //     p1: clickedPos,
        //     p2: mousePos(),
        //     color: rgb(0, 0, 255),
        // })

    }

})

onKeyPress("=", () => { camScale(camScale().add(1)) } )
onKeyPress("-", () => { if (camScale().sub(1).x > 0) {camScale(camScale().sub(1))}  } )
