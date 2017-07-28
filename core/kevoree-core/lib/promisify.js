// Wraps adaptation commands into Promises
// cmd => { type: string, path: string, execute: Promise, undo: Promise }
module.exports = function promisify(adaptations) {
  return adaptations
    .map((cmd) => {
      return {
        type: cmd.toString(),
        path: cmd.modelElement.path(),
        execute: function () {
          return new Promise((resolve, reject) => {
            cmd.execute((err) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            });
          });
        },
        undo: function () {
          return new Promise((resolve, reject) => {
            cmd.undo((err) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            });
          });
        }
      };
    });
};
