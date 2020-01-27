const express = require('express')
const photoUploaderRouter = express.Router();
const aws = require('aws-sdk');
const S3_BUCKET = process.env.S3_BUCKET;
const { requireAuth } = require('../middleware/auth-middleware');
const Config = require('../config');
photoUploaderRouter.get('/sign-s3', requireAuth, (req, res) => {
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        return res.end();
      }
      let { S3_BUCKET, S3_BUCKET_DIRECTORY } = Config;
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${S3_BUCKET_DIRECTORY}/${fileName}`
      };

      res.write(JSON.stringify(returnData));
      res.end();
    });
  })

  module.exports = photoUploaderRouter;