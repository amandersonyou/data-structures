// Connecting databases to web server application

var express = require('express'), // npm install express
    app = express();
var handlebars = require('handlebars')
var fs = require('fs')
var bodyParser = require('body-parser');
var path = require('path');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var moment = require('moment');
const { format, parseISO } =require('date-fns')
var dir= __dirname;

// Details for process blog data
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";
var dynamodb = new AWS.DynamoDB();

// Details for sensor data
const { Client } = require('pg'); // npm install dotenv
const dotenv = require('dotenv'); // npm install dotenv
// const cTable = require('console.table');
dotenv.config({path: '/home/ec2-user/environment/.env'});

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'amandersonyou';
db_credentials.host = 'data-structures.c1djtcjeelqp.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

//setup
// app.set('view engine', 'html');
app.use(express.static(path.join(dir, '/public')));
app.set('views', path.join(dir, 'public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 


// AA MAP
//render html file
app.get('/aamap', function(req, res) {
    res.sendFile(dir +"/public/aamap.html")
    //res.render("aa.html")
});

//query data
app.post('/aaData',  function(req, res) {
// Connect to the AWS RDS Postgres database
// var templateVariables= {};

    const client = new Client(db_credentials);
    client.connect();

    var queryDay= req.body.queryDay
    // var [from, to]=req.body.queryTime.split(",");
    var queryTime= req.body.queryTime
    //queryTime= req.body.queryTime

// look at this filtered query with Ryan. Do I need to go back and parse meeting name? 
    var thisQuery = "SELECT lat, long, building, address json_agg(json_build_object('Day', day, 'Start Time', startTime,  'End Time', endTime, 'Meeting Type', meetingtype, 'Special Interest', specialinterest)) as meetings FROM aa_event JOIN aa_location ON aa_event.locationid = aa_location.locationid WHERE (1=1) " + queryDay +  queryTime + " GROUP BY latitude, longitude, address;";
    client.query(thisQuery, (err, results) => {
        if (err) {throw err}
        else {
            const data = results.rows;
            console.log(data)
              client.end();
              return res.json(data);
        }
    });
});


app.get('/aaDefault',  function(req, res) {

const client = new Client(db_credentials);
client.connect();

    var thisQuery = "SELECT lat, long, address, building FROM aa_location ;";
    client.query(thisQuery, (err, results) => {
        if (err) {throw err}
        else {
            const data = results.rows;
            // console.log(data)
              client.end();
              return res.json(data);
        }
    });
});






// Attempt 1: 
// Query Functions:
// AA Map:
// app.get('/aamap', function (req, res) {
    
    // const client = new Client(db_credentials);
    // client.connect();

    // var thisAAQuery;
    // thisAAQuery = "SELECT aa_location.lat, aa_location.long, aa_location.building FROM aa_location";
    // thisAAQuery +=  "INNER JOIN aa_location ON aa_event.locationid=aa_location.locationid ";

//     client.query(thisAAQuery, (err, results) => {
//         if (err) {throw err}
//         else {
//             console.log(res.rows);
//             // do I need the var aaData below?
//             // var aaData = JSON.stringify(res.rows)

//     var output = {};

//             fs.readFile('./aamap.html', 'utf8', (error, data) => {
//                 var template = handlebars.compile(data);
//                 output.meetings = results.rows
//                 var html = template(output);
//                 res.send(html);
//             })
//             client.end();
//         }
//     });
// });



//PROCESS BLOG

app.get('/blog', function(req, res) {
    
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
            
            res.send(results.Items);
            
            // fs.readFile('./blog.html', 'utf8', (error, data) => {
            //     var template = handlebars.compile(data);
            //     output.entries = results.Items
            //     var html = template(output);
            //     res.send(html);
            // })
            // console.log(results.Items)
        }
    });

});

    // var output = {title: 'Process Blog', body: 'example content'};
  

// TEMP SENSOR
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

// Sensor Data Request
// app.get('/sensor', function(req, res) {
//     res.send(`<h3>Temperature data</h3>
//     <h4>Testing</h4>
//     <p>SELECT EXTRACT(DAY FROM sensorTime) as sensorday, <br>
//              AVG(sensorValue::int) as num_obs <br>
//              FROM sensorData <br>
//              GROUP BY sensorday <br>
//              ORDER BY sensorday;</p>`);
// }); 


// var landingPage = `<h1>Welcome to my three projects!</h1>
// <ul>
// <li><a href="/sensor">Sensor Data.</a></li>
// <li><a href="/ProcessBlogAAY">Process Blog Data.</a></li>
// <li><a href="/aamap">AA Map Data.</a></li>
// </ul>
// `;



// serve static files in /public
app.use(express.static('public'));

// listen on port 8080
app.listen(8080, function() {
    console.log('Server listening...');
});


