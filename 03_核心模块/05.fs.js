/*
    fs.readFile()
    fs.appendFIle() 创建新文件，或将数据添加到已有文件中
    fs.mkdir() 创建目录 （第二个参数 { recursive: true } 可以递归创建多层文件夹）
    fs.rmdir() 删除目录 （第二个参数 { recursive: true } 可以递归删除）
    fs.rm() 删除文件
    fs.rename() 重命名 （相当于 剪切）
    fs.copyFile() 复制文件
*/

// 引用中 加 node: 是为了 直接去找node 核心模块，更快一点
const fs = require("node:fs/promises");
const path = require("node:path");

const { delayPromise } = require("../utils/util");

// 向文件中添加内容
/* fs.appendFile(path.resolve(__dirname, "./hello.txt"), "\n超哥讲的真不错!!")
.then(() => console.log("添加成功"))
.catch(console.log); */

// 创建；重复创建的内容，会被多次添加到 同一个文件中
/* const evaluationPath = path.resolve(__dirname, "./evaluation.txt");
fs.appendFile(evaluationPath, "\r超哥讲的真不错!!")
  .then(() => console.log(`${evaluationPath} 创建成功`))
  .catch(console.log);; */

// 复制文件 方式 1- 先读再写
const originImgPath = path.resolve(__dirname, "../year.webp");
const newImgPath = path.resolve(__dirname, "./year_copy.webp");
/* fs.readFile(originImgPath)
  .then((buffer) => fs.appendFile(newImgPath, buffer))
  .then(() => {
    console.log(`成功复制到 ${newImgPath}`);
  })
  .catch(err => {
    console.log(err);
  }); */

// 复制文件 方式 2
/*   fs.copyFile(originImgPath, newImgPath)
    .then(() => {
      console.log(`成功复制到 ${newImgPath}`);
    })
    .catch((err) => {
      console.log(err);
    }); */

// 综合应用 - 每隔 2 秒 执行一个操作
const dirPath = path.resolve(__dirname, "../test");
try {
  (async () => {
    await delayPromise(() => fs.mkdir(dirPath), 2000);
    console.log("创建文件夹成功" + dirPath);

    await delayPromise(
      () =>
        fs.appendFile(
          path.resolve(__dirname, "../test/test.txt"),
          "this is test data."
        ),
      2000
    );
    console.log("创建文件成功" + path.resolve(__dirname, "../test/test.txt"));

    await delayPromise(
      () =>
        fs.rename(
          path.resolve(__dirname, "../test/test.txt"),
          path.resolve(__dirname, "../test/test2.txt")
        ),
      2000
    );
    console.log("重命名文件成功" + path.resolve(__dirname, "../test/test2.txt"));

    await delayPromise(
      () => fs.rm(path.resolve(__dirname, "../test/test2.txt")),
      2000
    );
    console.log(
      "删除文件成功" + path.resolve(__dirname, "../test/test2.txt")
    );

    await delayPromise(
      () => fs.rmdir(path.resolve(__dirname, "../test")),
      2000
    );
    console.log(
      "重删除文件夹成功" + path.resolve(__dirname, "../test")
    );
  })();
} catch (error) {
  console.log(error);
}