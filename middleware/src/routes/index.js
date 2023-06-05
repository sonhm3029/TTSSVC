const user = require("./users");
const tts = require("./tts");

function route(app) {
  app.use("/users", user);
  app.use("/tts", tts);
}

module.exports = route;
