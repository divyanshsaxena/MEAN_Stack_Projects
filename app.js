/*The following code is a node js code that gets the parameter for query from the URL
This parameter is then mapped with the mongodb and a particular collection is searched
After a document is found, it is displayed in the console

We have used multiple modules for this code and most important is mongoose
This mongoose module interacts with mongodb and connects it with the node js app
*/
var mongoose = require('mongoose');
//Here, we are loading the mongoose library or package
var dbHost = 'mongodb://localhost:27017/ad';
mongoose.connect(dbHost);
var http = require('http');
//loads the http package into nodejs and save it in http variable
var url = require('url');
//loads the url package into nodejs and save it in url variable
var querystring = require('querystring');
//loads querystring package into nodejs and save it in the variable
//this library is used to divide the string into different parts 
var myCollection = "store1";
var mongo = require('mongodb');
var mongoose = require('mongoose');
var express = require('express');
//In above steps, instances of the modules are created using var
var db1 = mongoose.createConnection('mongodb://localhost:27017/ad');
//'createConnection' is used to establish a connection with the database
db1.on('error', console.error.bind(console, 'connection error:'));
//If there is any erro with the connection, this statement displays
/*Used '.on' function to keep this checking process continuous and whenever
the connection fails during or before execution, the error message is displayed*/
db1.once('open', function callback () {
  //Created a callback function
  var stores=new mongoose.Schema({
    //This command is used to create a new schema
    /*In our case, the db is pre existing, but the structure of the same
    has to be mentioned by the 'mongoose.Schema' command*/
    externalLocationId: String,
    "startDate": {
        "nanos": String,
        "time": String,
        "class": String
    },
    "bopusEnabled": String,
    "storeOperationTime": String,
    "CalendarDayExceptions": {
        "item-id": String, //This is to be mapped with the URL parameter's value
        "exceptionType": String,
        "exceptionDescription": String,
        "exceptionStartTime": String,
        "exceptionDay": {
            "time": String,
            "class": String
        },
        "storeID": String,
        "exceptionEndTime": String
    },
    "locationId": String,
    "leadtime": String,
    "address1": String,
    "address2": String,
    "endDate": String,
    "address3": String,
    "type": String,
    "warehouse": String,
    "city": String,
    "version": String,
    "distance": String,
    "postalCode": String,
    "faxNumber": String,
    "phoneNumber": String,
    "stateAddress": String,
    "orgname": String,
    "orgCode": String,
    "name": String,
    "longitude": String,
    "effectiveToDate": String,
    "item-id": String,
    "status": String,
    "hours": String,
    "country": String,
    "county": String,
    "email": String,
    "latitude": String
});
  //Lines 36-82 denotes the schema of the collection inside mongo database
var doc = mongoose.model('doc',stores,'store1');
//This step creates a new model of our created schema which can be further used

/*The following steps are regarding URL
We create a web server first*/
var server = http.createServer(function(req, res) {
  //Created a web server using 'createServer'
var params = querystring.parse(url.parse(req.url).query);
    /*this code divdes the url into different parts (only if a space is present)
    url.parse is used to get the url and .query converts the parsed string into query
    the different strings are stored in variable 'params'*/
    res.writeHead(200, {"Content-Type": "text/plain"});
//The above command tells the client about the type of response
    if('id' in params)
    {
    	res.write('id is ' + params['id'])
    }
    if('id' in params)
    {
    console.log(params['id']);
	}  
/*The above statements (line 98-105) are used to display the URL parameter onto the webpage
along with the console. res.write command publishes it to the web page.
'id' is the parameter to which the value is assigned on to the URL
Eg - http://localhost:8080?id=abcd
The 'id' in above link is the parameter which is used in both ifs as the output of line 92
that is params is a string that has different values of URL. In this case, URL has only one value, id*/
  doc.find({"CalendarDayExceptions.item-id":params['id']},function(err, users){  
    //These statements matches the parameter value with the collection's document
    //The collection's model was stored in 'doc' which is used here
        if(err) return console.err(err);  
        //Displays the error, if any on to the console
        console.log(users);  
        //Displayes the output onto the console
    });  
   res.end();
   //This ends the web server
});

   
server.listen(8071);    
//Port Number is decided manually
});
//------------------------------END-------------------------------------//
