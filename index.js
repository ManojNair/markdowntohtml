exports.handler = (event, context, callback) => {

    const AWS = require('aws-sdk');
    const marked = require('marked');

    AWS.config.update({
        region: 'ap-southeast-2'
    });

    var s3 = new AWS.S3();


    event.Records.forEach((r) => {

        var bucketname = r.s3.bucket.name;
        var key = r.s3.object.key;

        let s3getObject = s3.getObject({
            Bucket: bucketname,
            Key: key
        }).promise();

        s3getObject.then((data) => {

            return marked(String(data.Body));
        }).then((markeddata) => {

            let newFileName = key.split(".")[0] + ".html"
            console.log(`Uploading file ${newFileName} to the bucket mnhtmloutput`);

            s3.putObject({
                Bucket: "mnhtmloutput",
                Key: newFileName,
                Body: markeddata,
                ContentType: 'text/html'

            }, (err,data)=>{

                if(err){
                    console.log(err.message);
                }

                else{

                    console.log(data.ETag);
                    console.log("Object uploaded to the output bucket")
                }
            })
        }).catch((err) => {

            console.log(err.message);
        })

    });
}