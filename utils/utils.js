const fs = require("fs/promises")

function readData(){
    return fs.readFile("db.json", "utf8")
    .then((data) => {
        return JSON.parse(data)
    })
}

function readUsers() {
    return fs.readFile("files.json", "utf-8")
    .then((data) => {
        // console.log("data is ", JSON.parse(data.toString()))
        return JSON.parse(data.toString());
    })
}

module.exports = {
    readUsers,
    readData,
    fs
}