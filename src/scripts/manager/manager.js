import kaboom from "kaboom";
import { gui } from "../globalScripts/gui";

kaboom({
    background: [0,0,0]
})

const config = new gui([width() - 100, height() - 100], [50, 50], 1, 1, false, color(10,50,60))

config.addLayer("test", [50, 50], [50,50], color(255,10,10), null, 2)
config.addObj(text("click", {font: "sink", color: [0,0,0]}), [0,0], 1, () => config.hideLayer("test", !config.isLayerHidden("test")), "test")