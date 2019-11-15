// Connecting databases to web server application

var express = require('express'), // npm install express
    app = express();

// Details for process blog data
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

// Details for sensor data
const { Client } = require('pg'); // npm install dotenv
const dotenv = require('dotenv'); // npm install dotenv
dotenv.config({path: '/home/ec2-user/environment/.env'});

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'amandersonyou';
db_credentials.host = 'data-structures.c1djtcjeelqp.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;


// Senson Data Request
app.get('/sensor', function(req, res1) {
    const client = new Client(db_credentials);
    client.connect();

    var thisQuery = "SELECT * FROM sensorData;";
    
    client.query(thisQuery, (err, res) => {
        if (err) {throw err}
        else {
            console.table(res.rows);
    
    var data = JSON.stringify(res.rows);   
    res1.send(`<p> Rows:${data} </p>`);
    
    }
});
});



// AA Map Data Request
app.get('/aamap', function(req, res1) {
    const client = new Client(db_credentials);
        client.connect();
    
    
    var thisAAQuery = "SELECT * FROM aa_event;";

    client.query(thisAAQuery, (err, res) => {
        if (err) {throw err}
        else {
            console.table(res.rows);
            
        var aa_data = JSON.stringify(res.rows);   
        res1.send(`<p> AA Data:${aa_data} </p>`);
        client.end();
    }
});
});


// Process Blog
app.get('/ProcessBlogAAY', function(req, res) {
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
            // data.Items.forEach(function(item) {
            //     console.log("***** ***** ***** ***** ***** \n", item);
            // }); 
            res.send(data.Items[1]);
    // can use .project etc. after index call to specify what you're printing
        }
    });
    
    // res.send('data.Items.forEach(function(item)');
});


app.get('/', function(req, res) {
  res.send(`<h1>Welcome to my three projects!</h1>
            <ul>
                <li><a href="/sensor">Sensor Data.</a></li>
                <li><a href="/ProcessBlogAAY">Process BlogData.</a></li>
                <li><a href="/aamap">AA Map Data.</a></li>
                </ul>`);
});


// serve static files in /public
// might make a directory in public with CSS style sheets 
app.use(express.static('public'));

// listen on port 8080
app.listen(8080, function() {
    console.log('Server listening...');

});
