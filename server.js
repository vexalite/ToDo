const express = require ("express")
const utils = require("./utils/utils.js")
const fs = require("fs/promises")
const app = express()

//////////////////////////// Middleware //////////////////////////////////////////

app.use(express.json())

app.get("/", (req,res) => {
    return res.send("Home of the Lander")
})


///////////////////////   Routers   //////////////////////////////////////////////////

app.get("/todos",(req,res) => {
    return utils.readData()
    .then((data) => {
        return res.status(200).json({
            message: "All todos fetched",
            data: data,
            error:null
        })
    })
   
})

app.post("/todos",(req,res)=>{
    const newTodo = req.body
    return utils.readData()
    .then((data) =>{
        data.push(newTodo)
        return fs.writeFile("db.json", JSON.stringify(data))
    })
    .then (() => {
        return res.status(201)
        .json({
            message: "All todos fetched",
            data: newTodo,
            error:null
        })
    })
})

app.get("/greetings", (req,res) => {
    return res.send("Greetings")
})
 app.listen(3000, () => {
    console.log("server at 3000")
 })