// SEE ASSIGNMENT05B FOR UPDATED VERSION, CREATED NEW TABLE DURING WEEK06

//npm install aws-sdk

/* Set up structure for process blog entries. Using the project name as my 
primary key, and the date as my sort key. Note that I previously set date to be 
a number when setting up the table itself, however I would continually recieve 
errors until I made a new table and set date to be a string.*/
var blogEntries = [];

class BlogEntry {
  constructor(project, date, thoughts, task, inspo) {
    this.project = {};
    this.project.S = project.toString();
    
    this.date = {}; 
    this.date.S = new Date(date).toDateString();
    
    if (task != null) {
      this.task = {};
      this.task.SS = task;
    }
    
    this.thoughts = {};
    this.thoughts.S = thoughts;
    
    if (inspo != null) {
      this.inspo = {};
      this.inspo.SS = inspo;
    }
    this.month = {};
    this.month.N = new Date(date).getMonth().toString();
  }
}

// Created blog entries for last 4 weeks. Does not include this week (week 5)
blogEntries.push(new BlogEntry("AA Meeting Map", "2019-08-30", "For the first week of working on the AA Meeting Map assignment, we focused on first requesting and saving the agenda pages from the html links provided. As a result, we have copies of each file locally so we can work with them and not risk disturbing the website.", ["Gather"], null));
blogEntries.push(new BlogEntry("AA Meeting Map", "2019-09-09", "This week we continued to work on one of the ten files from week 1. We were tasked with using the module Cheerio to parse through the very disorganized html and pull out relevant address information for each meeting. I chose to include the building name, the street address, add New York, NY to each, and include the zip code.", ["Gather", "Clean"], null));
blogEntries.push(new BlogEntry("AA Meeting Map", "2019-09-16", "The third week of the AA Meeting Map project focuses on using the Texas A&M Geoservices Geocoding API to obtain the latitude and longitude for the addresses we gathered the previous week. We are still working with 1 of the 10 html files we pulled from week 1.", ["Gather", "Clean"], null));
blogEntries.push(new BlogEntry("AA Meeting Map", "2019-09-23", "In week 4 of the AA Meeting Map project we are building an SQL database structure to hold the meeting data we have been collecting. I created 4 tables: geolocation, event, building, and main. For now, I have input the location data from weeks 2 and 3 into the geolocation table.", ["Structure"], null));

// console.log(blogEntries);


// Used aws-sdk to log each entry into DynamoDB 
var AWS = require('aws-sdk');
var async = require('async');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();

/* Used async.eachSeries to loop through the blog entries, utilized setTimeout 
to not loop through nore than 2 puts per second.*/
async.eachSeries(blogEntries, function(value, callback) {
  var params = {};
  params.Item = value; 
  params.TableName = "process-blog-aay";
  
  dynamodb.putItem(params, function (err, data) {
    if (err) console.log(err, err.stack); 
    else     console.log(data); 
  });
  setTimeout(callback, 1000); 
});