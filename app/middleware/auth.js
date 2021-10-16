const db = require("../models");
const bcrypt = require('bcrypt');

const User = db.users;

module.exports = (req, res, next) => {
  var authHeader = req.headers.authorization;

  if (!authHeader) {
    var err = new Error("You are not authenticated");

    res.setHeader("WWW-Authenticate", "Basic");

    err.status = 401;
    err.message="User is not authenticated";
    res.status(401).send(err.message);
  }

  var auth = new Buffer(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

  var username = auth[0];

  var password = auth[1];


User.findOne({
  where: {
    username
  }
}).then(result => {

  const verified = bcrypt.compareSync(password, result.password);
 
  // Bcrypt.validate()
  // User passoword - auth[1]
  // DB password result.password
  // validate 1st and 2nd
  console.log(verified);
  // Req.method === 'GET'
  if (!verified) {
    var err = new Error("You are not authenticated");

    res.setHeader("WWW-Authenticate", "Basic");

    err.status = 401;
    err.message = "User is not authenticated";
    res.status(401).send(err.message);
  }
  else {
    console.log(req.method);
    if (req.method === 'GET') {
      res.status(200).send({id:result.id,
        first_name :result.first_name,
        last_name:result.last_name,
        username:result.username,
        account_created: result.account_created,
        account_updated: result.account_updated})
    }
    else if (req.method === 'PUT') {
      // Update DB with new req.body
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err){
          res.status(400).send();
        }
        else{
          const id = result.id;
      
      if (req.body.username) {
        res.status(400).send();
        return;
      }
      if (req.body.account_created) {
        res.status(400).send();
        return;
      }
      if (req.body.account_updated) {
        res.status(400).send();
        return;
      }
      const userUpdate = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: hash
    }
      User.update(userUpdate,{
        where:{
          id: result.id
        } 
      }).then(data => {
        res.status(204).send()
      })

        }
      })
      
      
    }
    }
    
  // Update user
  // next()

})


  // if (username == req.body.username && password == req.body.password) {
  //   next();
  // } else {
  //   var err = new Error("You are not authenticated");

  //   res.setHeader("WWW-Authenticate", "Basic");

  //   err.status = 401;
  //   err.message = "User is not authenticated";
  //   res.status(401).send(err.message);
    
  // }
}

// module.exports = auth;
