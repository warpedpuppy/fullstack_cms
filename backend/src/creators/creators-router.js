const express = require('express')
const creatorsRouter = express.Router();
const CreatorsService = require('./creators-service');

creatorsRouter
.get("/", (req, res) => {
    CreatorsService.getAllCreators(req.app.get('db'))
    .then(results => {
        let creators = results.map(result => CreatorsService.serializeUser(result))
        res
        .status(200)
        .json({creators})
    })
})


module.exports = creatorsRouter;