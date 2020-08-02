const express = require("express");
const cors = require("cors");
const path = require('path');
// making few variables accessible globally

global._app = express();
global._config = require("./config");

_app.use(cors());
_app.use(require("./middleware"));
_app.use(require("./routes"));

_app.use(express.static(path.join(__dirname, "../client/build/")));

// Running the app
_app.listen(`${_config.get("port")}`, () => {
  console.log(
    `App is running on ${_config.get("port")} in ${_config.get(
      "environment"
    )} mode`
  );
});
