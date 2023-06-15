// const express = require ("express")
// const utils = require("./utils/utils.js")
// // const fs = require("fs/promises")
// const app = express()
// const router = require("./routes/todos.routes.js")
// const viewsRouter = require("./routes/views.routes")
// //////////////////////////////////  Set View Engine \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// app.set("view engine", "ejs")           // mounting the view engine on express


// //////////////////////////// Middleware //////////////////////////////////////////
// app.use(express.json())

// // app.get("/", (req,res) => {
// //     return res.send("Home of the Lander")
// // })

// ///////////////////////   Routers   //////////////////////////////////////////////////

// app.use("/", viewsRouter)

// app.use("/todos", router)



// // app.get("/todos",(req,res) => {
// //     return utils.readData()
// //     .then((data) => {
// //         return res.status(200).json({
// //             message: "All todos fetched",
// //             data: data,
// //             error:null
// //         })
// //     })
   
// // })

// // app.post("/todos",(req,res)=>{
// //     const newTodo = req.body
// //     return utils.readData()
// //     .then((data) =>{
// //         data.push(newTodo)
// //         return utils.fs.writeFile("db.json", JSON.stringify(data))
// //     })
// //     .then (() => {
// //         return res.status(201)
// //         .json({
// //             message: "All todos fetched",
// //             data: newTodo,
// //             error:null
// //         })
// //     })
// // })

// app.get("/greetings", (req,res) => {
//     return res.send("Greetings")
// })
//  app.listen(3000, () => {
//     console.log("server at 3000")
//  })

const express = require("express")
const todoRoute = require("./routes/todos.routes")
const viewsRouter = require("./routes/views.routes")
const authRouter = require("./routes/auth.routes")
const middlewares = require("./middlewares/index")


const app = express()


app.set("view engine", "ejs")


app.use(middlewares.logger)


app.use(express.json())


app.use(express.static(__dirname + "/public"))


app.get("/greeting", (req, res) => {
    return res.send("Greetings from Todo app.")
})

// VIEWS ROUTERS
app.use("/", viewsRouter)



app.use("/api/todos", todoRoute) 
app.use("/api/v1/auth", authRouter) 

app.listen(3000, () => {
    console.log("Todo server is running");
})