const fs = require("fs/promises");

async function readDataTable(filePath, defaultVal, cb) {
  return await fs
    .readFile(filePath)
    .then((data) => {
      if (!data.toString()) {
        return defaultVal;
      }

      try {
        return JSON.parse(data.toString());
      } catch (error) {
        return defaultVal;
      }
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
  return await fs.writeFile(filePath, writableData);
}

module.exports = {
  writeDataTable,
  readDataTable,
};
