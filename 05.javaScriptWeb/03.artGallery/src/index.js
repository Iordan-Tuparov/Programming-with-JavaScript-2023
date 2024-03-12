const express = require("express");
const cookieParser = require("cookie-parser");

const routes = require("./routes");

const { PORT } = require("./config/env");
const { auth } = require("./middlewares/authMiddleware");

let app = express();

require("./config/hbsConfig")(app);
require("./config/mongooseConfig")();

app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth);
app.use(routes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
