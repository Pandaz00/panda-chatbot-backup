/*const express = require("express");
const db = require("../app");
const app = express();
const cookie = require("cookie-parser");
const PORT = process.env.PORT || 5000;
app.use("/js", express.static(__dirname + "public/js"))
app.use("/js", express.static(__dirname + "public/css"))
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(cookie());
app.use(express.json());
db.connect((err) => {
    if (err) {
        console.log('error' + err.message);
        return;
    }
    else console.log("database connected");

})
app.use("/", require("../routes/pages"))
app.listen(PORT);*/