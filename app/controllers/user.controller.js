const bcrypt = require('bcrypt');


const { users } = require("../models");
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.first_name) {
      res.status(400).send({
        message: "First Name can not be empty!"
      });
      return;
    }
    else if(!req.body.last_name){
        res.status(400).send({
            message: "Last Name can not be empty!"
          });
          return; 
    }
    else if(!req.body.username){
        res.status(400).send({
            message: "User Name can not be empty!"
          });
          return; 
    }
    else if(!req.body.password){
        res.status(400).send({
            message: "Password can not be empty!"
          });
          return; 
    }

    bcrypt.hash(req.body.password, 10, (err,hash) => {
        if(err){
            res.status(500).json({
                error: err,
                message : "Some error occurred while creating the user"
            });
        }
        else{
            const userObject = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                password: hash
            }
            User.create(userObject)
            .then(data => {
                
                const token = jwt.sign({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    username: req.body.username,
                }, 
                process.env.JWT_KEY,
                {
                    expiresIn : "1h"
                })
                console.log(data.id)
                const dataNew = {
                  userID : data.id,
                  first_name : req.body.first_name,
                  last_name : req.body.last_name,
                  username : req.body.username
                }
                
                res.status(200).send({dataNew, token});

            })
            .catch(err => {
                res.status(400).send({
                message:
                err.message || "Some error occurred while creating the user."
            });
         });
        }
    } )

  };

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.iLike]: `%${id}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};

// Find a User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      res.status(200).send({
        uuid: data.id,
        first_name : data.first_name,
        last_name: data.last_name,
        username: data.username
      });
    })
    .catch(err => {
      res.status(500).send({
        error: err,
        message: "Error retrieving user with id=" + id
      });
    });
};

// Update a User by the id in the request


exports.update = (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if(err){
      res.status(500).json({
        error : err,
        message : "Some error occurred while updating the user"
      });
    }
    else if(req.params.id == null){
      res.status(400).json({
        message: "Choose a user ID to update"
      })
    }
    else{
      const id = req.params.id;
      
      if (req.body.username) {
        res.status(400).send({
          message: "Username cannot be updated"
        });
        return;
      }
      const userUpdate = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: hash
    }
      User.update(userUpdate, {
        where: { id: id}
       })
      .then(num => {
        if (num == 1) {
          res.status(200).send({
            message: "User was updated successfully."
         });
        } else {
          res.status(400).send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
     .catch(err => {
       res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });

    }


  })
  
};

// Delete a Users with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "User was deleted successfully!"
        });
      } else {
        res.status(400).send({
          message: `Cannot delete User with id=${id}. User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.status(200).send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};

