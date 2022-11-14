const express = require("express")
const app = express()
const path = require("path")
const fs = require("fs")

const PORT = 3000

app.listen(PORT, () => {
    console.log("Listening on port: " + PORT)
})

app.use("/scripts", express.static(path.join(__dirname, "/src/scripts")))
app.use("/sounds", express.static(path.join(__dirname, "/src/sounds")))
app.use("/sprites", express.static(path.join(__dirname, "/src/sprites")))
app.use("/class", express.static(path.join(__dirname, "src/scripts/classes")))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "/page.html"))
})

app.get("/editor", (_req, res) => {
    res.sendFile(path.join(__dirname, "/levelEditor.html"))
})

app.post("/save", (req, res) => {
    //console.log(req.body[0])
    var jsonContent = JSON.stringify(req.body);
    fs.writeFile("src/levels/level.json", jsonContent, 'utf8', function (err) {
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

app.post("/load", (req, res) => {
    const file = req.body.file;
    const data = fs.readFileSync(`src/levels/${file}.json`)
    const json = JSON.parse(data);
    console.log(json)
    res.send({
        body: json
    })
})

// app.get("/level", (_req, res) => {
//     res.sendFile(path.join(__dirname, "/level.html"))
// })