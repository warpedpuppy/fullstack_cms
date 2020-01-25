const express = require('express')
const creatorsRouter = express.Router();
const CreatorsService = require('./creators-service');

creatorsRouter
.get("/", (req, res) => {
    CreatorsService.getAllCreators(req.app.get('db'))
    .then(results => {
        let creators_obj = CreatorsService.makeObj(results)
        //console.log(creators_obj)
        res
        .status(200)
        .json({creators: creators_obj})
    })
})


module.exports = creatorsRouter;