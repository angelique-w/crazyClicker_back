const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");
const uuidv4 = require("uuid/v4");

// Reach Sequelize models
const User = require("../sequelize/models/users");
const Team = require("../sequelize/models/teams");

// Get all users
router.get("/", (req, res) => {
    User.findAll({ include: [{ model: Team }] })
        .then(users => res.status(200).json(users))
        .catch(err => {
            console.log(err);
            res.status(400).json({
                status: "error",
                message: "Invalid request"
            });
        });
});

// Get one user
router.get("/:uuid", (req, res) => {
    const uuid = req.params.uuid;
    User.findOne({ include: [{ model: Team }] }, { where: { uuid: uuid } })
        .then(user => res.status(200).json(user))
        .catch(err => {
            res.status(400).json({
                status: "error",
                message: "Invalid request"
            });
        });
});

module.exports = router;
