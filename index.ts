import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import * as eks from "@pulumi/eks";


var buckets = ["pulumi-1","pulumi-2","pulumi-3"]
var mynames:any[] = []

// Create many AWS s3 buckets
buckets.map((name)=>{
    const bucket = new aws.s3.Bucket(name);
    // Export the name of the buckets
    mynames.push(bucket.id);
})
exports.bucketName = mynames


// Create VPC
const vpc = new awsx.ec2.Vpc("vpc",{
    cidrBlock: "10.0.0.0/16"
})

// Cluster
const cluster = new eks.Cluster("cluster", {
    vpcId: vpc.id,
    subnetIds:vpc.publicSubnetIds,
    instanceType: "t2.medium",
})

exports.kubeconfig = cluster.kubeconfig

