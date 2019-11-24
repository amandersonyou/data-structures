// Connecting databases to web server application

var express = require('express'), // npm install express
    app = express();
var handlebars = require('handlebars')
var fs = require('fs')
    
var landingPage = `<h1>Welcome to my three projects!</h1>
<ul>
<li><a href="/sensor">Sensor Data.</a></li>
<li><a href="/ProcessBlogAAY">Process Blog Data.</a></li>
<li><a href="/aamap">AA Map Data.</a></li>
</ul>
`;

// app.get('/', function(req, res) {
//   res.send(landingPage);
// });

// app.get('/sensor', function(req, res) {
//     res.send('<h3>this is the page for my sensor data</h3>');    
// });

// serve static files in /public
app.use(express.static('public'));

// listen on port 8080
app.listen(8080, function() {
    console.log('Server listening...');
});



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


// Sensor Data Request
app.get('/sensor', function(req, res) {
    var output = {title: 'Temperature Sensor Visualization', body: 'example content'};

    const client = new Client(db_credentials);
        client.connect();
    
    var thisQuery = "SELECT * FROM sensorData;";

    client.query(thisQuery, (err, results) => {
        if (err) {throw err}
        else {
            console.log(results.rows);
            fs.readFile('./sensor.html', 'utf8', (error, data) => {
                var template = handlebars.compile(data);
                output.records = results.rows
                var html = template(output);
                res.send(html);
            })
            client.end();
        }
    });

});



// // AA Map Data Request
app.get('/aamap', function(req, res) {
    var output = {title: 'AA Map Visualization', body: 'example content'};

    const client = new Client(db_credentials);
        client.connect();
    
    
    var thisAAQuery = "SELECT aa_location.lat, aa_location.long, aa_location.building FROM aa_location;";
    //INNER JOIN aa_event ON aa_location.locationid = aa_event.locationid;

    client.query(thisAAQuery, (err, results) => {
        if (err) {throw err}
        else {
            console.log(res.rows);
            fs.readFile('./aamap.html', 'utf8', (error, data) => {
                var template = handlebars.compile(data);
                output.meetings = results.rows
                var html = template(output);
                res.send(html);
            })
            client.end();
        }
    });
});



// Process Blog

app.get('/blog', function(req, res) {
    var output = {title: 'Process Blog', body: 'example content'};
    var dynamodb = new AWS.DynamoDB();
    
    
    var params = {
        TableName : "ProcessBlogAAY",
        KeyConditionExpression: "#project = :project and #date between :minDate and :maxDate", // the query expression
        ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
            "#project" : "project"
            ,"#date" : "date"
        },
        ExpressionAttributeValues: { // the query values
            ":project": {S: "Process Blog"},
            ":minDate": {S: new Date("2019-09-20").toISOString()},
            ":maxDate": {S: new Date("2019-12-16").toISOString()}
        },
        ExpressionAttributeValues: { // the query values
            ":project": {S: "Temperature Sensor"},
            ":minDate": {S: new Date("2019-10-23").toISOString()},
            ":maxDate": {S: new Date("2019-12-16").toISOString()}
        },
        ExpressionAttributeValues: { // the query values
            ":project": {S: "AA Meeting Map"},
            ":minDate": {S: new Date("2019-08-30").toISOString()},
            ":maxDate": {S: new Date("2019-12-16").toISOString()}
        },
    };
    
    dynamodb.query(params, function(err, results) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log(results.rows);
            fs.readFile('./blog.html', 'utf8', (error, data) => {
                var template = handlebars.compile(data);
                output.entries = results.Items
                var html = template(output);
                res.send(html);
            })
            console.log(results.Items)
        }
    });

});
