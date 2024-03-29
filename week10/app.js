// Connecting databases to web server application

var express = require('express'), // npm install express
    app = express();
var handlebars = require('handlebars')
var fs = require('fs')
var moment = require('moment');
var bodyParser = require('body-parser');
app.use(express.static('public'));

// Details for process blog data
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";
var dynamodb = new AWS.DynamoDB();

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



// AA Map ----------------------------------------
app.get('/aamap', function(req, res1) {
    
    // Connect to the AWS RDS Postgres database
    // aaQuery(res,res1,"Mondays");
    var thisAAQuery = "SELECT lat, long, address, building, day, startTime, endTime, meetingtype, specialinterest FROM aa_location INNER JOIN aa_event ON aa_location.locationid=aa_event.locationid WHERE day='"+req.query.day+"'";
    const client = new Client(db_credentials);
    client.connect();
    client.query(thisAAQuery, (err, res) => {
        console.log(err, res.rows);
    
        res1.send(res.rows)
        
        client.end();
    });

});




//PROCESS BLOG ----------------------------------------
app.get('/blog', async function (req, res) {
    
var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "ProcessBlogAAY",
    KeyConditionExpression: "#project = :project and #date between :minDate and :maxDate", // the query expression
    ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
        "#project" : "project"
        ,"#date" : "date"
    },
    ExpressionAttributeValues: { // the query values
        ":project": {S: req.query.project},
        ":minDate": {S: new Date("2019-08-30").toISOString()},
        ":maxDate": {S: new Date("2019-12-16").toISOString()}
    }
};

    var output = {};
    
    
  dynamodb.query(params, function(err, data) {
      if (err) {throw err}
      else {
          
          output.blogpost = [];
          data.Items.forEach(item => {
              output.blogpost.push({project: item.project.S, date: moment(item.date.S).format("LL"), thoughts: item.thoughts.S})
          })
          
         
         fs.readFile('./bloghandle.html', 'utf8', (error, templateData) => {
            var template = handlebars.compile(templateData);
            var html = template(output);
            res.send(html);
            
        
        })
      }
  });

});
  
  
  

//TEMP SENSOR ----------------------------------------

app.get('/sensor', function(req, res1) {
    
// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to query the entire contents of a table: 
var secondQuery = "SELECT * FROM sensorData;"; // print the number of rows

console.log('test');

client.query(secondQuery, (err, res) => {
    if (err) {throw err}
    else {
    var data = JSON.stringify(res.rows)
    res1.send(res.rows)
    
    }
});

});

// Example provided in class:
//     // Connect to the AWS RDS Postgres database
//     const client = new Pool(db_credentials);

//     // SQL query 
//     var q = `SELECT EXTRACT(DAY FROM sensorTime) as sensorday,
//              AVG(sensorValue::int) as num_obs
//              FROM sensorData
//              GROUP BY sensorday
//              ORDER BY sensorday;`;

//     client.connect();
//     client.query(q, (qerr, qres) => {
//         if (qerr) { throw qerr }
//         else {
//             res.end(template({ sensordata: JSON.stringify(qres.rows)}));
//             client.end();
//             console.log('1) responded to request for sensor graph');
//         }
//     });
// }); 


// serve static files in /public
app.use(express.static('public'));

// listen on port 8080
app.listen(8080, function() {
    console.log('Server listening...');
});
