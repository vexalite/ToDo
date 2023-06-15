const express = require("express")
const utils = require("../utils/utils")
const router = express.Router()
const { isAuthenticated } = require("../middlewares");

// router.get("", (req,res) => {
//     return utils.readData()
//     .then((dataArr) => {
//         res.render("index", {title: "Home",  todos: dataArr})
//     })
    
// })

// router.get("/todos/:title", (req, res) => {
//     const { title } = req.params

//     return utils.readData()
//         .then((dataArr) => {
//             const data = dataArr.find((element) => element.title.toLowerCase() === title.toLowerCase())

//             return res.render("todos", { title: "Update", todos: data })
//         })
// })

router.get("", (req, res) => {
    console.log("The passed key from request is ----- ", req.randomKey);
    return utils.readData()
    .then((dataArr) => {
        // to render the files processed by view engine
        return res.render("index", {title: "Home", todos: dataArr})
    })
})

// isAuthenticated is a middleware
router.get("/todos/add", (req, res) => {
    return res.render("todo_add", {title: "Add"})
})
router.get("/auth/register", (req, res) => {
    return res.render("register", {title: "Register"})
})
router.get("/auth/login", (req, res) => {
    return res.render("login", {title: "Login"})
})

// parameters routes at last
router.get("/todos/:title", (req, res) => {
    const {title} = req.params
    // console.log("title is ", title);

    return utils.readData()
    .then((dataArr) => {
        const todo = dataArr.find((element) => {
            // console.log("element is ", element);
            return element.title.toLowerCase() === title.toLowerCase()
        })
        // console.log("todo is ", todo);
        return res.render("todo", {title: "Update", todo})
    })
})


module.exports = router