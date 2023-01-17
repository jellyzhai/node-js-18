const fs = require('fs')
const path = require("path");

const filePath = path.resolve(__dirname, './hello.txt')

fs.readFile(filePath, (err, buffer) => {
    if (err) {
        console.log(err)
    } else {
        console.log(buffer.toString());
    }
})