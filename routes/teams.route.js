const express = require("express");
const router = express.Router();

// Reach Sequelize models
const User = require("../sequelize/models/users");
const Team = require("../sequelize/models/teams");

// Get all teams
router.get("/", (req, res) => {
    Team.findAll({ include: [{ model: User }] })
        .then(teams => res.status(200).json(teams))
        .catch(err => {
            console.log(err);
            res.status(400).json({
                status: "error",
                message: "Invalid request"
            });
        });
});

module.exports = router;
