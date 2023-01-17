const path = require('path');
const fs = require('fs');

const helleTxtPath = path.resolve(__dirname, './hello.txt');

// 同步读文件方法不推荐
const helloBuffer = fs.readFileSync(helleTxtPath);

console.log(helloBuffer.toString());