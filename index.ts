import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";


var buckets = ["pulumi-1","pulumi-2","pulumi-3"]
var mynames:any[] = []

// Create an AWS resource (S3 Bucket)
buckets.map((name)=>{
    const bucket = new aws.s3.Bucket(name);
    // Export the name of the bucket
    mynames.push(bucket.id);
})

exports.bucketName = mynames
