module.exports = app => {
    const user = require("../controllers/user.controller.js");
    const auth = require("../middleware/auth")
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", user.create);
  
    // Retrieve all Users
    // router.get("/", user.findAll);
  
    // Retrieve all published Users
  
    // Retrieve a single User with id
    router.get("/self", auth, user.findOne);
  
    // Update a User with id
    router.put("/self", auth, user.update);

  
    // Delete a User with id
    // router.delete("/:id", user.delete);
  
    // // Delete all User
    // router.delete("/", user.deleteAll);
  
    app.use("/v1/user", router);
  };