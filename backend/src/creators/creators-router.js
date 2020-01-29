const express = require('express')
const creatorsRouter = express.Router();
const CreatorsService = require('./creators-service');

creatorsRouter
.get('/all-creators', async (req, res) => {
    let creators = CreatorsService.getAllCreators(req.app.get('db'))
    if (creators) {
        res
        .status(200)
        .json({creators})
    } else {
        res
        .status(500)
        .json({success: false})
    }
})
.get('/get-creator-data', async (req, res) => {
 
    let limit = req.query.limit ? req.query.limit : 10,
        id = req.query.id,
        creators = await CreatorsService.getCreatorAndArticleTitles(req.app.get('db'), id, limit)

    if (creators) {
        res
        .status(200)
        .json({creators})
    } else {
        res
        .status(500)
        .json({success: false})
    }

})
.get("/all-creators-and-their-articles", async (req, res) => {
    let result = CreatorsService.getAllCreatorsAndAllOfTheirArticles(req.app.get('db'));
    
    if (result) {
        let creators_obj = CreatorsService.makeObj(result)
        res
        .status(200)
        .json({creators: creators_obj})
    }
})


module.exports = creatorsRouter;