const mongoose = require('mongoose');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const s3 = new aws.S3({
    accessKeyId: 'AKIASGX2XWMSZ6ZL4AV7',
    secretAccessKey: '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',
    region: 'us-east-1'
});

const PostSchema = new mongoose.Schema({
    name: String,
    size: Number,
    key: String,
    url: String,
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

PostSchema.pre('save', function () {
    if (!this.url) {
        this.url = `http://localhost:3333/files/${this.key}`
    }
});

PostSchema.pre('remove', function () {
    s3.deleteObject({
        Bucket: 'appupload44',
        Key: this.key,
    }).promise();

   // promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key));
    
});

module.exports = mongoose.model('Post', PostSchema);