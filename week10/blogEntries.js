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
// blogEntries.push(new BlogEntry("AA Meeting Map", "2019-10-09", "We don’t have class this Wednesday because of Yom Kippur. I am grateful to have a little more worktime as we work on a large assignment parsing and cleaning the rest of the AA Data for Week 7.", ["Structure"], null));
// blogEntries.push(new BlogEntry("AA Meeting Map", "2019-10-13", " This week we are writing queries to both our SQL and NoSQL databases. These tasks are split into part 1 and part 2. I am using the geo-location table I created and populated on week 4 to write a query. I plan to complete the rest of the parsing for the other information for Zone 10, and then all parsing for all zones by next week. For now, I am focusing on a simple query with the information I already have.", ["Gather"], null));
// blogEntries.push(new BlogEntry("Process Blog", "2019-10-14", " For this week’s assignment, I went back to week05 and set my date string to be .toISOString in order to be able to query results. I am wondering if I should broaden my process blog entries to include all of my classes or keep it simple and only report on my Data Structures projects.", ["Structure"], null));
// blogEntries.push(new BlogEntry("AA Meeting Map", "2019-10-16", "Today in class we discussed terms for data science and what it means to “clean” data. Is it janitor work? How do the different tasks within data science compare to each other from gathering and cleaning to analysis and visualization? It seems that sometimes people look down upon the cleaning and gathering aspect, when in reality, it is an essential part of the job, and doing it well will set you up for the next step. Most jobs have aspects of them that aren’t a person’s favorite task but that help lead to the parts of projects that inspire them most.", ["Clean"], null));
// blogEntries.push(new BlogEntry("AA Meeting Map", "2019-10-18", "This week was a doozy! We actually had about 2 weeks to work through it as we were tasked with parsing all relevant information for all 10 AA zones and inserting the .json data into SQL tables. I ended up creating two tables total, linking them on a location ID in both. The first table is a location table containing the location ID, building name, street address, latitude, and longitude. When inserting into the SQL table, I compared the latitude and longitude coordinates and removed any duplicates. More on this tomorrow!", ["Clean"], null));
// blogEntries.push(new BlogEntry("AA Meeting Map", "2019-10-19", "Today I continued working on parsing all of the AA meeting map data. The second table I made is an event table containing time information like the day of the week, the start time, the end time, as well as the meeting type and special interest details and of course the location ID again to be able to join the tables appropriately.", ["Clean"], null));
// blogEntries.push(new BlogEntry("AA Meeting Map", "2019-10-20", "I’m on the home stretch of parsing and cleaning up all of my AA meeting map data and am inserting the .json objects into SQL tables. I will end up querying these tables in a later week to create a web interface using the data. I am going to have the location and events table connect to each other using a location ID.", ["Structure"], null));
// blogEntries.push(new BlogEntry("Temperature Sensor", "2019-10-23", "We are beginning our third project of the semester tracking our own data on a temperature sensor we’re each building. As an introduction into this, we are talking about data gathering and surveillance. I think it is easy to overlook how much information we release about ourselves when we partake in technologies that record our environments. I am excited to do something a little different and work with hardware for a little bit in building our sensors. Aaron, our professor, gave us a demo of how to build the sensors, and we will each need to build our own throughout the next week.", ["Gather"], null));
// blogEntries.push(new BlogEntry("Temperature Sensor", "2019-10-30", "I am joining a few classmates today to solder our Particle io sensors as a group. I have soldered one time before when I took a jewelry making class, but I have never soldered electronics. Antonie helped me and did a great job! ", ["Structure"], null));
// blogEntries.push(new BlogEntry("Temperature Sensor", "2019-10-31", "I set up my particle sensor by connecting it to my breadboard and setting up the wires in the appropriate positions. I have activated the sensor and connected it to the app using the code provided in class. I did this at the university using the router there, so tomorrow I will need to set up the sensor at home using my wifi.", ["Gather"], null));
// blogEntries.push(new BlogEntry("Temperature Sensor", "2019-11-04", "I set up a database using PostgreSQL to record the sensor value (temperature) and the datetime. I have it recording ever minute because of the short timespan in which the kettle will impact temperature and I'd rather collect too much data than too little. I aim to collect data for the entire month of November.", ["Gather"], null));
// blogEntries.push(new BlogEntry("Temperature Sensor", "2019-11-10", "I am having fun checking the temperature of my apartment. I live on the top floor (5th) of an old pre-war building, and it gets pretty warm. There is boiler heat and the pipe in the bathroom keeps it overly toasty. We have turned off the radiators in the other rooms, but it is consistently around 79 degrees.", ["Gather"], null));
// blogEntries.push(new BlogEntry("AA Meeting Map", "2019-11-15", "We are now looking at creating endpoints and interfaces for our final three projects. My biggest concern is creating a usable site for the AA Meeting Map. This was the biggest challenge for me for far in Data Structures as parsing and cleaning data from all of the files was a complicated task.", ["Structure"], null));
// blogEntries.push(new BlogEntry("Process Blog", "2019-11-18", "I am thinking more about the interfaces for the final projects. I’d like for all of them to look cohesive and share the same color scheme and design principles. Functionality-wise, they will of course differ based on their individual needs. I think that the layout for the process blog will be the most straight forward.", ["Structure"], null));
// blogEntries.push(new BlogEntry("Process Blog", "2019-11-20", "Today the first group presented on the last of our reading topics. We are divided into three groups and address central themes Reliability, Scalability, and Maintainability as they relate to data structures. The section I am in is Scalability. We have decided to divide the reading and present on our individual sections, but are also getting together a couple of times to rehearse and review our thoughts as a group.", ["Structure"], null));
// blogEntries.push(new BlogEntry("Temperature Sensor", "2019-11-24", "I am keeping an eye on my temperature sensor to make sure it is still recording. I have heard some classmates mention that their sensors stopped recording for unknown reasons. So far, so good on my end. It is still about 80 degrees inside. Luckily the other half of the apartment where I sleep is a bit cooler.", ["Gather"], null));
// blogEntries.push(new BlogEntry("Temperature Sensor", "2019-11-26", "We have Thanksgiving guests in town from Minneapolis! My husband and my best friends are visiting for 4 days – I have already warned them to not unplug the temperature sensor in their own self interest of charging their phones. That outlet is off limits. I can’t wait for this much needed mini-break before finals.", ["Gather"], null));
// blogEntries.push(new BlogEntry("Temperature Sensor", "2019-11-24", "I am keeping an eye on my temperature sensor to make sure it is still recording. I have heard some classmates mention that their sensors stopped recording for unknown reasons. So far, so good on my end. It is still about 80 degrees inside. Luckily the other half of the apartment where I sleep is a bit cooler.", ["Gather"], null));
// blogEntries.push(new BlogEntry("Process Blog", "2019-12-04", "Today I was part of the presentation group talking through the Scalability reading. My specific section addressed “coping with load”. I don’t think myself or my classmates need to think too much about our projects having too much load given they are made more for skills demonstration than to be used by the public. This got me thinking about anticipated and unanticipated growth for projects that go viral.", ["Structure"], null));
// blogEntries.push(new BlogEntry("AA Meeting Map", "2019-12-06", "I have been working on my queries and interface for the AA Meeting Map. I am intimidated by this project as I have not worked with maps before. Once it is finished though, it will be a big check mark off my list knowing I went through all of the steps from scraping and cleaning the data, to database creation, and finally interface development.", ["Structure"], null));
// blogEntries.push(new BlogEntry("Temperature Sensor", "2019-12-07", "Today I worked on final projects with Marisa and Luella at a coffee shop in Williamsburg. We made a lot of progress in getting our endpoints to be responsive to our queries. I realized that I must have stopped my temperature sensor recording data because I had some issues with my pm2 instance. Luckily, I have already been recording for 40 days, so I have enough data.", ["Structure"], null));
// blogEntries.push(new BlogEntry("Process Blog", "2019-12-08", "For finals, I am working on interfaces for three different projects – to make it a little more digestible, and now that I have my endpoints created, I will focus on completing one at a time. I am going to complete the process blog first, then move onto the temperature sensor, and ultimately the AA Meeting Map. It is going to be a long and arduous week!", ["Structure"], null));
// blogEntries.push(new BlogEntry("Process Blog", "2019-12-08", "For finals, I am working on interfaces for three different projects – to make it a little more digestible, and now that I have my endpoints created, I will focus on completing one at a time. I am going to complete the process blog first, then move onto the temperature sensor, and ultimately the AA Meeting Map. It is going to be a long and arduous week!", ["Structure"], null));
// blogEntries.push(new BlogEntry("Process Blog", "2019-12-09", "I have been spending most of my time this week so far wrapping up my final project for Major Studio 1, I present that tomorrow so I will next be able to focus more on Data Structures and DVIA final projects. I am very much looking forward to recharging over winter break and coming back to dig into new classes and new projects.", ["Structure"], null));
// blogEntries.push(new BlogEntry("Process Blog", "2019-12-10", "Today the maintainability group presents their reading section. All of the aspects of maintainability, scalability, and reliability are so interwoven, you inevitably address all three when creating a successful project. I will continue to work on my final projects the rest of this week with a goal to be done by Saturday night. By then, my group will each be creating a screen recording of our projects to combine into one 20 minute demonstration of how scalability is reflected within our final work.", ["Structure"], null));



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