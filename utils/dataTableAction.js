const fs = require("fs/promises");

async function readDataTable(filePath, defaultVal, cb) {
  return await fs
    .readFile(filePath)
    .then((data) => {
      console.log("data.toString：", JSON.parse(data.toString()));
      return JSON.parse(data.toString());
    })
    .catch((err) => {
      console.log(err);
      if (cb instanceof Function) {
        cb();
      }
      return defaultVal;
    });
}

async function writeDataTable(filePath, writableData) {
  await fs.rm(filePath);
  return await fs.appendFile(filePath, writableData);
}

module.exports = {
  writeDataTable,
  readDataTable,
};
