const express = require('express')
const adminRouter = express.Router()
const { requireAuth } = require('../middleware/auth-middleware')
const bcrypt = require('bcryptjs')
const jsonBodyParser = express.json();
const AdminService = require('./admin-services');
const aws = require('aws-sdk');
const S3_BUCKET = process.env.S3_BUCKET;
adminRouter
.get('/get-bucket-contents', requireAuth, jsonBodyParser, async (req, res) => {
    let startAfter = req.body.startAfter ? req.body.startAfter : undefined;

    const s3 = new aws.S3();
        const s3Params = {
            Bucket: S3_BUCKET,
            MaxKeys: 10,
            StartAfter: startAfter
          };
          s3.listObjectsV2(s3Params, (err, data) => {
            if (err) {
                //console.log(err, err.stack)
                return res.end();
            }  else  {   
                //console.log(data); 
                res.write(JSON.stringify(data));
                res.end();
            }          
          });

})
module.exports = adminRouter;