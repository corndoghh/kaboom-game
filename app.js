const express = require("express")
const app = express()
const path = require("path")

const PORT = 3000

app.listen(PORT, () => {
    console.log("Listening on port: " + PORT)
})

app.use("/scripts", express.static(path.join(__dirname, "/src/scripts")))
app.use("/sounds", express.static(path.join(__dirname, "/src/sounds")))
app.use("/sprites", express.static(path.join(__dirname, "/src/sprites")))


app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "/page.html"))
})