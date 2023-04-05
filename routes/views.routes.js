const express = require("express")
const utils = require("../utils/utils")
const router = express.Router()

router.get("", (req,res) => {
    return utils.readData()
    .then((dataArr) => {
        res.render("index", {title: "Home",  todos: dataArr})
    })
    
})

router.get("/todos/:title", (req, res) => {
    const { title } = req.params

    return utils.readData()
        .then((dataArr) => {
            const data = dataArr.find((element) => element.title.toLowerCase() === title.toLowerCase())

            return res.render("todos", { title: "Update", todos: data })
        })
})

module.exports = router