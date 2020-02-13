const express = require('express')
const adminRouter = express.Router()
const { requireAuth } = require('../middleware/auth-middleware')
const bcrypt = require('bcryptjs')
const jsonBodyParser = express.json();
const AdminService = require('./admin-services');
const aws = require('aws-sdk');
const S3_BUCKET = process.env.S3_BUCKET;
adminRouter
.get('/get-bucket-contents', requireAuth, async (req, res) => {

    const s3 = new aws.S3();
        const s3Params = {
            Bucket: S3_BUCKET
          };
          s3.listObjects(s3Params, (err, data) => {
            if (err) {
                //console.log(err, err.stack)
                return res.end();
            }  else  {   
                //console.log(data); 
                res.write(JSON.stringify(data.Contents));
                res.end();
            }          
          });

})
module.exports = adminRouter;