//npm install aws-sdk

/* Add blog entries for final */

var blogEntries = [];

class BlogEntry {
  constructor(project, date, thoughts, task, inspo) {
    this.project = {};
    this.project.S = project.toString();
    
    this.date = {}; 
    this.date.S = new Date(date).toISOString();
        
    this.thoughts = {};
    this.thoughts.S = thoughts;
    
    if (task != null) {
      this.task = {};
      this.task.SS = task;
    }
    
    if (inspo != null) {
      this.inspo = {};
      this.inspo.SS = inspo;
    }
    this.month= {};
    this.month.N = new Date(date).getMonth().toString();
  }
}

// Created blog entries for last 4 weeks. Does not include this week (week 5)
// blogEntries.push(new BlogEntry("AA Meeting Map", "2019-08-30", "For the first week of working on the AA Meeting Map assignment, we focused on first requesting and saving the agenda pages from the html links provided. As a result, we have copies of each file locally so we can work with them and not risk disturbing the website.", ["Gather"], null));
// blogEntries.push(new BlogEntry("AA Meeting Map", "2019-09-09", "This week we continued to work on one of the ten files from week 1. We were tasked with using the module Cheerio to parse through the very disorganized html and pull out relevant address information for each meeting. I chose to include the building name, the street address, add New York, NY to each, and include the zip code.", ["Gather", "Clean"], null));
// blogEntries.push(new BlogEntry("AA Meeting Map", "2019-09-16", "The third week of the AA Meeting Map project focuses on using the Texas A&M Geoservices Geocoding API to obtain the latitude and longitude for the addresses we gathered the previous week. We are still working with 1 of the 10 html files we pulled from week 1.", ["Gather", "Clean"], null));
// blogEntries.push(new BlogEntry("AA Meeting Map", "2019-09-23", "In week 4 of the AA Meeting Map project we are building an SQL database structure to hold the meeting data we have been collecting. I created 4 tables: geolocation, event, building, and main. For now, I have input the location data from weeks 2 and 3 into the geolocation table.", ["Structure"], null));
// blogEntries.push(new BlogEntry("Process Blog", "2019-09-30", "This week, we started a new project: Process Blogs. We are using a noSQL format and working with AWS service DynamoDB to format our databases. I can already tell working with dates that want to be strings is going to be tricky.", ["Structure"], null));
// blogEntries.push(new BlogEntry("AA Meeting Map", "2019-10-07", "This week we don't have class on Wednesday because of Yom Kippur. I can use the extra work day as I've been mostly focusing on my Major Studio project focusing on qualitative data from the MET. I am writing a query to the SQL database I made in week04 for the AA meeting map. I anticipate spending a lot of time before the 21st of this month parsing through the rest of the AA Meeting data.", ["Structure"], null));
// blogEntries.push(new BlogEntry("Process Blog", "2019-10-12", "Today I am finishing up the week06 assignment creating a query for my NoSQL process blog. I needed to go back and alter the stucture of the blog to make the sort key of date be a number instead of a string in the table set up. Our professor Aaron said dates would be frusterating for this project, and he was right. ", ["Structure"], null));



console.log(blogEntries);


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
  params.TableName = "ProcessBlogAAY";
  
  dynamodb.putItem(params, function (err, data) {
    if (err) console.log(err, err.stack); 
    else     console.log(data); 
  });
  setTimeout(callback, 1000); 
});