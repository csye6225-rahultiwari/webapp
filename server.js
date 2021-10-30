const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const auth = require("./app/middleware/auth")
const app = express();

global.__basedir = __dirname;

var corsOptions = {
    origin : "http://localhost:8083"
};

app.use(cors(corsOptions));

app.use(
    bodyParser.raw({ limit: '50mb', type: ['image/*'] })
);
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true}));
const db = require("./app/models");
db.sequelize.sync();
// to get all
global.username;
app.get("/v1", (req, res) => {
    res.json( {message: "welcome to user database"});
})



require("./app/routes/user.routes")(app);
//port

const PORT = process.env.PORT || 8083;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})