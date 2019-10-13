// npm install aws-sdk
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "ProcessBlogAAY",
    KeyConditionExpression: "#project = :project and #date between :minDate and :maxDate", // the query expression
    ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
        "#project" : "project"
        ,"#date" : "date"
    },
    ExpressionAttributeValues: { // the query values
        ":project": {S: "AA Meeting Map"},
        ":minDate": {S: new Date("2019-08-30").toISOString()},
        ":maxDate": {S: new Date("2019-09-23").toISOString()}
    }
};

dynamodb.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log("***** ***** ***** ***** ***** \n", item);
        });
    }
});