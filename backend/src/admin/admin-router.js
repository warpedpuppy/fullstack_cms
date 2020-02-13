const express = require('express')
const adminRouter = express.Router()
const { requireAuth } = require('../middleware/auth-middleware')
const bcrypt = require('bcryptjs')
const jsonBodyParser = express.json();
const AdminService = require('./admin-services');

adminRouter
.get('/get-bucket-contents', requireAuth, async (req, res) => {
  
    let result = await AdminService.getBucketContents()

    if (result) {
        res
        .status(200)
        .json({success: true, result})
    } else {
        res
        .status(500)
        .json({success: false})
    }

})
module.exports = adminRouter;