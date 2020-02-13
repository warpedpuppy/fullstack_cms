const Config = require('../config');
const xss = require('xss');
const aws = require('aws-sdk');
const S3_BUCKET = process.env.S3_BUCKET;
const AdminService = {
    getBucketContents () {
        const s3 = new aws.S3();
        const s3Params = {
            Bucket: S3_BUCKET,
            MaxKeys: 10
          };
          s3.listObjects(s3Params, (err, data) => {
            if (err) {
                //console.log(err, err.stack)
                return res.end();
            }  else  {   
                //console.log(data); 
                res.write(JSON.stringify(data));
                res.end();
            }          
          });
    }

}
module.exports = AdminService;