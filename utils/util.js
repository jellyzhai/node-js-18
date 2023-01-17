function delayPromise(cb, time) {
    return new Promise(async (resolve, reject) => {
        setTimeout(() => {
            cb()
              .then(() => resolve())
              .catch((err) => reject(err));
        }, time)
    })
}

module.exports = {
    delayPromise
}