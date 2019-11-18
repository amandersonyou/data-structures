# Week 11 Assignment

Visit my url: http://54.196.189.175:8080/

This week we are designing our interfaces for our three final assignments. Below 
are the details and considerations I've evaluated in combination with the designed
sketches. 

Overall there will be one home page where the viewer can select between the three 
projects. Once a link is selected, they will be brought to that specific visualization 
experience. 


1. Process Blog
The format will encourage the viewer to browse and scroll through multiple entries.
The home page will load all entries, from most recent to earliest. The user will also 
be able to filter by the primary key which is "project". I'll have three buttons 
for the three projects I post about in the process blog: AA Map, Process Blog, and 
Temperature Sensor. When the user selects one of those options, they will be brought 
to a new page and each entry with that project type will populate. To do this, I 
plan to use a res.send to direct to a url matching a query requesting that particular 
project.

2. AA Map
This format will be a map where the user can type in their request and recieve 
the meetings that match their query visible through markers on the map. The markers will 
be clickable to see the meeting details. I plan to allow them to search based on a 
zip code and a start time range. To do this, I will need to allow the data to be 
queried by both location and time. For example, selecting values within a time window 
where location is within a certain range of distance from provided zipcode. I will then 
need to be able to populate all the meeting details for a selected meeting from that query.
The default view would be all meetings starting within the next hour in all of Manhattan. 
This seems like a good idea in case someone is in an urgent situation and needs a 
meeting asap without navigating the search. I would also like to make it work that 
the user can search based on time only, if they'd prefer to not share their zipcode.

3. Temperature Sensor
I'd like for the temperature sensor to be a static visualization where the user can 
view the full month of data at one time. I don't anticipate the temperature data being 
dramatically different based on time or telling an obvious story, so I'd like to show 
the full set of data at once to tell a holistic story. I will also include a small 
write-up about the project.

