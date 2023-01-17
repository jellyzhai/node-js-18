const path = require("path");
const fs = require("fs/promises");

const filePath = path.resolve(__dirname, "./hello.txt");

// 方式 1
fs.readFile(filePath)
  .then(buffer => console.log(buffer.toString()))
  .catch(console.log);

  /*
   * 方式 2
   * 在异步函数中，以同步方式编写代码，await 代码行，后面的代码，将放到微任务中执行，然后 结束 async 函数，继续执行
   */
  ;(async () => {
    try {
        const buffer = await fs.readFile(filePath)
        console.log(buffer.toString())
    } catch (error) {
        console.log(error);
    }
  })()