import { gui } from "../globalScripts/gui"
import * as exports from "../globalScripts/functions"  
Object.entries(exports).forEach(([funName, exported]) => window[funName] = exported);

export const selectorScreen = async () => {
    document.title = "Level selector"
    let cancelKey = undefined

    const selector = new gui(
        [width() - 40 * 8, height() - 40 * 5],
        [20 * 8, 20 * 5],
        0.5,
        99,
        false,
        color(89, 90, 95),
    )


    selector.addLayer("levelSelect", [96, 80], [50, 45], outline(1, [0,0,0]))
    
    selector.addLayer("hide", [96, 20], [50, 95], outline(1, new Color(44, 45, 47)), color(44, 45, 47), 100)
    selector.addLayer("hide2", [96, 20], [50, 110], outline(1, new Color(0,0,0)), color(0,0,0), 100)
    selector.addLayer("hide3", [96, 20], [50, -10], outline(1, new Color(0,0,0)), color(0,0,0), 100)
    selector.addLayer("hide4", [96, 5], [50, 2.5], outline(1, new Color(44, 45, 47)), color(44, 45, 47), 100)

    selector.addObj(text("Level Selector", {font: "sink", size: 72}), [50,-7], 1, () => {} )


    


        
    const keyPress = await new Promise( async (resolve, _reject) => {
    
        selector.addObj(text("New", {font: "sink", size: 48}), [50,90], 1, async () => {
            const textResult = await boxInput(text("hello", {font: "sink"}), text("New level"), [0,0,0,0.9], true);
            resolve({
                new: true,
                session: textResult
            })
        } )

        const data = (await (await fetch("/getLevels")).json()).levels



        data.forEach(async (x, i) => {
            await loadSprite(x+"-Sprite", `/levels/${x}/image.png`)
            const xPos = (34 * (i % 3) + 16) - 50;
            const yPos = ((74 + (74*Math.floor(i / 3)) - (selector.gui.width/3 * 0.7 /2 / selector.layers.get("levelSelect").height * 100))) - 50

            const box = add([
                rect(selector.gui.width/3 * 0.8, selector.gui.width/3 * 0.7),
                origin("center"),
                pos(xPos, yPos),
                z(99),
            ])


            // const obj = add([
            //     sprite(x+"-Sprite"),
            //     scale(0.2),
            //     pos((100/data.length*0.5) * (2*i) + 15, 20),
            //     origin("center"),
            //     z(105),
            // ])
            selector.addObjFull(box, () => console.log("cool"), "levelSelect")

            //selector.addObjFull(obj, () => console.log("cool"), "levelSelect")
        })

        let currentScroll = 0
        const maxScroll = -Math.floor((data.length -1) / 3) * 440


        function detectMouseWheelDirection( e )
        {
            var delta = null,
                direction = false
            ;
            if ( !e ) { // if the event is not provided, we get it from the window object
                e = window.event;
            }
            if ( e.wheelDelta ) { // will work in most cases
                delta = e.wheelDelta / 60;
            } else if ( e.detail ) { // fallback for Firefox
                delta = -e.detail / 2;
            }
            if ( delta !== null ) {
                direction = delta > 0 ? 'up' : 'down';
            }

            return direction;
        }
        function handleMouseWheelDirection( direction )
        {
            const savedLevels = selector.layers.get("levelSelect").objs
            const moveDir = direction == "down" ? -40 : 40
            currentScroll += moveDir 
            if (currentScroll < maxScroll || currentScroll > 0 ) { currentScroll -= moveDir; return; }

            savedLevels.forEach((x) => {
                x.moveBy(0, moveDir)
            })
        }
        document.onmousewheel = function( e ) {
            handleMouseWheelDirection( detectMouseWheelDirection( e ) );
        };
        if ( window.addEventListener ) {
            document.addEventListener( 'DOMMouseScroll', function( e ) {
                handleMouseWheelDirection( detectMouseWheelDirection( e ) );
            });
        }


        // selector.addObjFull(add([
        //     rect(width() - 40 * 8, 10),
        //     pos(0, 83),
        //     color(0,0,255),
        //     z(99),
        // ]), () => { })

        


        // cancelKey = onKeyDown(("v"), () => {
        //     console.log("b")
        //     resolve({
        //         new: false,
        //         session: "x",
        //         rawBlockData: [{coords: {x: 10, y: 0, z: 10}}],
        //     })
        // })

    })

    //cancelKey()
    selector.remove();


    
    return keyPress







} 