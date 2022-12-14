export const levelLoader = async (level) => {
    const path = `/levels/${level}`
    await loadSprite(`${level}_image`, path+"/image.png")
    const blocks = await (await fetch(path+"/blocks.json")).json()
    const rawBlocks = await (await fetch(path+"/rawBlockData.json")).json()
    const items = await (await fetch(path + "/items.json")).json()
    const entites = await (await fetch(path + "/entites.json")).json()

    const blockImageArray = []
    blocks.forEach((x) => {if (!blockImageArray.includes(x.image)) { blockImageArray.push(x.image) } })

    if (blockImageArray.length > 0) {
        await new Promise(async (r, _j) => { blockImageArray.forEach(async (x, i) => { await loadSprite(x, `sprites/${x}.png`); if (i == blockImageArray.length - 1) { r() } }) })
    }

    //await loadSprite(blockImageArray[0], `sprites/${blockImageArray[0]}.png`)
    return { image: `${level}_image`, blocks, rawBlocks, items, entites }
}