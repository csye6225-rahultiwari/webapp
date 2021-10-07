const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();

var corsOptions = {
    origin : "http://localhost:8080"
};

app.use(cors(corsOptions));


app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true}));
const db = require("./app/models");
db.sequelize.sync();
// to get all
app.get("/", (req, res) => {
    res.json( {message: "welcome to user database"});
})

require("./app/routes/user.routes")(app);
//port

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})