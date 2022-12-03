const express = require("express")
const app = express()
const path = require("path")
const fs = require("fs")

const PORT = 3000

app.listen(PORT, () => {
    console.log("Listening on port: " + PORT)
})

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use("/scripts", express.static(path.join(__dirname, "/src/scripts")))
app.use("/sounds", express.static(path.join(__dirname, "/src/sounds")))
app.use("/sprites", express.static(path.join(__dirname, "/src/sprites")))
app.use("/class", express.static(path.join(__dirname, "src/scripts/classes")))
app.use("/levels", express.static(path.join(__dirname, "src/levels")))



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "/page.html"))
})

app.get("/editor", async (_req, res) => {
    res.sendFile(path.join(__dirname, "/levelEditor.html"))
})

app.get("/manager", async (_req, res) => {
    res.sendFile(path.join(__dirname, "/manager.html"))
})


app.get("/gg", (_req, res) => {
    res.sendFile(path.join(__dirname, "/gg.html"))
})

app.get("/getLevels", (_req, res) => {
    res.send({
        levels: fs.readdirSync("src/levels")
    })
})

app.post("/save", (req, res) => {
    //console.log(req.body[0])
    const blocks = JSON.stringify(req.body.blocks);
    const urlData = JSON.stringify(req.body.image);
    const session = JSON.stringify(req.body.session).split('"')[1];
    const rawBlockData = JSON.stringify(req.body.rawBlockData.filter((x) => x != null).concat(req.body.blocks))

    console.log(rawBlockData)



    var dataurl= urlData.split('"')[1]
    //console.log(dataurl)
    var regex = /^data:.+\/(.+);base64,(.*)$/;
    var matches = dataurl.match(regex);
    //console.log(matches)
    var ext = matches[1];
    var data = matches[2];
    var buffer = Buffer.from(data, 'base64');


    if (!fs.existsSync(`src/levels/${session}/`)) { fs.mkdirSync(`src/levels/${session}/`) }


    fs.writeFileSync(`src/levels/${session}/image.` + ext, buffer);



    fs.writeFile(`src/levels/${session}/blocks.json`, blocks, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
     
        console.log("JSON file has been saved.");
    });


    fs.writeFile(`src/levels/${session}/rawBlockData.json`, rawBlockData, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
     
        console.log("JSON file has been saved.");
    });
    res.send({
        body: req.body
    });

})

// app.post("/load", (req, res) => {
//     const file = req.body.file;
//     const data = fs.readFileSync(`src/levels/${file}.json`)
//     const image = fs.readFileSync(`src/levels/image.png`)
//     const buffer = Buffer.from(image, 'base64');
//     console.log(buffer)
//     const json = JSON.parse(data);
//     console.log(json)
//     res.send({
//         body: {
//             blocks: json,
//             image: buffer

//         }
//     })
// })

// app.get("/level", (_req, res) => {
//     res.sendFile(path.join(__dirname, "/level.html"))
// })