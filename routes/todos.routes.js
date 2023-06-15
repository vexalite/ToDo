const express = require("express")
const utils = require("../utils/utils.js")
const fs = require("fs/promises")

const router = express.Router()
const { body, validationResult } = require("express-validator")
const { isAuthenticated } = require("../middlewares")

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

// router.post("/",(req,res)=>{
//     const newTodo = req.body
//     return utils.readData()
//     .then((data) =>{
//         data.push(newTodo)
//         return utils.fs.writeFile("db.json", JSON.stringify(data))
//     })
//     .then (() => {
//         return res.status(201)
//         .json({
//             message: "All todos fetched",
//             data: newTodo,
//             error:null
//         })
//     })
// })

router.post("/", isAuthenticated, body("title").custom((title)=>{
    if(typeof title === "string" && title.length >= 3){
        return true;
    }
    return false;
}).withMessage("Provide suitable title with more than or equals to 3 characters"),
body("completed").custom((completed) => {
    if(typeof completed === "boolean"){
        return true
    }
    return false
}).withMessage("Completed radio button should be true/false."),
(req, res) => {
    const newTodo = req.body

    console.log("---post body---", newTodo);

    // to show errors in the response object
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        console.log("---erors---", errors);
         return res.status(400).json({
            message: "Todo creation failed.",
            error: errors.array(),
            data: {}
         })
    }
    return utils.readData()
    .then((data)=>{
        data.push(newTodo)

        // writing the JSON object after converting it to string
        return fs.writeFile("db.json", JSON.stringify(data))
    })
    .then(()=>{
        return res.status(201).json({
            message: "New todo added",
            data: newTodo,
            error: null
        })
    })
})

router.get("/:title", isAuthenticated, (req,res) =>{
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

router.put("/:title", isAuthenticated,  (req,res) => {
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


router.delete(("/:title"),isAuthenticated,  (req,res) =>{
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
