const { Client } = require('pg'); // npm install dotenv
const dotenv = require('dotenv'); // npm install dotenv
dotenv.config();

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'amandersonyou';
db_credentials.host = 'data-structures.c1djtcjeelqp.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to create a table: 
// Original: var thisQuery = "CREATE TABLE aalocations (address varchar(100), lat double precision, long double precision);";
var thisQuery = "CREATE TABLE aa_geolocation (address varchar(100), lat double precision, long double precision);";
// var thisQuery = "CREATE TABLE aa_event (event_id int, name varchar(100));";
// var thisQuery = "CREATE TABLE aa_building (building_id int, name varchar(100));";
// var thisQuery = "CREATE TABLE aa_main (main_id int, event_id int, building_id int, meeting_type varchar(100), special_interest varchar(100), day varchar(100), start_time time, end_time time, accessibility varchar(100), additional_detail varchar(100));";
// Sample SQL statement to delete a table: 
// var thisQuery = "DROP TABLE aa_geolocation;"; 

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});
// console.log('successful');