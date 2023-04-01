const express = require("express")
const utils = require("../utils/utils.js")
const fs = require("fs/promises")
const { isTypedArray } = require("util/types")
const router = express.Router()

router.get("/",(req,res) => {
    return utils.readData()
    .then((data) => {
        return res.status(200).json({
            message: "All todos fetched",
            data: data,
            error:null
        })
    })
   
})

router.post("/",(req,res)=>{
    const newTodo = req.body
    return utils.readData()
    .then((data) =>{
        data.push(newTodo)
        return utils.fs.writeFile("db.json", JSON.stringify(data))
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


router.get("/:title",(req,res) =>{
    const title = req.params.title.toLowerCase()
    
    return utils.readData()
    .then((dataArr) => {
        const todoObj = dataArr.find((todo) => {
            return todo.title.toLowerCase() === title
        })

        return res.status(200)
        .json({
            message : "Todo fetched successfully",
            data: todoObj,
            error: null
    })
    })

   
})

router.put("/:title", (req,res) => {
    const title = req.params.title.toLowerCase()
    const updateTodo = req.body
    return utils.readData()
    .then((dataArr) => {
        const idx = dataArr.findIndex((todo) => {
            return todo.title.toLowerCase() === title
        })

        if(idx != -1){
            dataArr[idx] = {
                ...dataArr[idx],
                ...updateTodo
            }
        }

        return fs.writeFile("db.json", JSON.stringify(dataArr))
    })
        .then ( () => {
            return res.status(200)
            .json({
                message: "Todo updated successfully",
                data: updateTodo,
                error: null
            })
        })
        
})


router.delete(("/:title"), (req,res) =>{
    const title = req.params.title.toLowerCase()
    let deletedObj

    return utils.readData()
    .then((dataArr) => {
        const idx = dataArr.findIndex((todo) => {
            return todo.title.toLowerCase() === title
        })

        if(idx != -1){
            daletedObj = dataArr.splice(idx, 1)
        }

        return fs.writeFile("db.json", JSON.stringify(dataArr))
    })
    .then ( () => {
        return res.status(200)
        .json({
            message: "Todo deleted successfully",
            data: deletedObj,
            error: null
        })
    })
    
})

router.delete(("/"), (req,res) => {
    //dataArr.reduce
})
module.exports = router
