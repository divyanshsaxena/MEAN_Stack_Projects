//NodeJS is a low level language

//PROJECT 1.0
var http = require('http');
//require function loads the library into the nodejs.
//In this case, we have loaded http library.
//http library is used to create http server.

var server = http.createServer(function(req, res) {
//http variable has the library functions of http
//Using 'createServer', a server is created and stored in variable server
//Function is passed onto the createServer setting that has two arguments.
//First is req(request) that takes input from the client. Eg - Form etc
//Second is res(response) that sends output from server to client. Eg - html codes
res.writeHead(200);
//200 code is used to tell the client that everything is ok.
res.end('Hi everybody!');
//using end, we stop the server connection and display the text provided.
});
server.listen(8080);
//Using server.listen, we pass the port number 8080 to which we need to interact


//-------------------------------------------------------------

//PROJECT 1.1
var http = require('http');
var server = http.createServer(function(req, res) {
res.writeHead(200, {"Content-Type": "text/html"});
//Instead of sending a plain text, we can send a html page as a response
res.end('<p>Here is a paragraph of <strong>HTML</strong>!</p>');
});
server.listen(8080);


//-------------------------------------------------------------

//PROJECT 1.2
var http = require('http');
var url = require('url');
var server = http.createServer(function(req, res) {
var page = url.parse(req.url).pathname;
console.log(page);
res.writeHead(200, {"Content-Type": "text/plain"});
res.write('Well Hello');
res.end();
});
server.listen(8080);


//-------------------------------------------------------------

//PROJECT 1.3
var http = require('http');
var url = require('url');
//loads the libraries
var server = http.createServer(function(req, res) {
var page = url.parse(req.url).pathname;
//this code takes the url as a single string
console.log(page);
res.writeHead(200, {"Content-Type": "text/plain"});
if (page == '/') {
res.write('You\'re at the reception desk. How can I help you?');
}
else if (page == '/basement') {
res.write('You\'re in the wine cellar. These bottles are mine!');
}
else if (page == '/floor/1/bedroom') {
res.write('Hey, this is a private area!');
}
res.end();
});
server.listen(8080);


//-------------------------------------------------------------

//PROJECT 1.4
var http = require('http');
var url = require('url');
//loads the url package into nodejs and save it in url variable
var querystring = require('querystring');
//loads querystring package into nodejs and save it in the variable
//this library is used to divide the string into different parts 
var server = http.createServer(function(req, res) {
    var params = querystring.parse(url.parse(req.url).query);
    //this code divdes the url into different parts
    //url.parse is used to get the url
    //the different strings are stored in params
    res.writeHead(200, {"Content-Type": "text/plain"});
    //tells client that the response is a plain
    if ('firstname' in params && 'lastname' in params) {
        res.write('Your name is ' + params['firstname'] + ' ' + params['lastname']);
    	//prints the output
    }
    else {
        res.write('You do have a first name and a last name, don\'t you?');
        //prints the output
    }
    res.end();
    //ends the connection
});
server.listen(8080);
//points to a specific port


//-------------------------------------------------------------

//PROJECT 1.5
var EventEmitter = require('events').EventEmitter;
//Load the requried library and store it in a variable
var game = new EventEmitter();
//Create an instace of the library variable
game.on('gameover', function(message){
	//listening to event using 'on'.
    console.log(message);
});
//We need to write the code for listening to event before creating it
//Or else, if the event is emitted first, the event stops in seconds
//Now, when the code of listening to the event runs, it comes as FALSE
//as there is nothing to listen.
game.emit('gameover', 'You lose!');
//Generating a new event and passing a message with it 


//-----------------------------------------------------------

//Creating own module
var sayHello = function(){
	console.log('Hello!');
}
//Creating a new function that prints something
//Storing the function in a variable
var sayGoodbye = function(){
	console.log('Goodbye!');
}
//Creating a new function that prints something
//Storing the function in a variable
exports.sayHello = sayHello;
//Exporting the above functions into a parameter that could be used externally
exports.sayGoodbye = sayGoodbye;
//Exporting the above functions into a parameter that could be used externally

//Save this file as mymodule.js in a new folder (project folder)

//-------------------------------------------------------------

//Using the above modules in my application (app.js)
var mymodule = require('./mymodule');
//Using require, we load the particular module into this js application
mymodule.sayHello();
mymodule.asyGoodbye();

//-------------------------------------------------------------

//Code to handle a URL using routes
//These routes are in express module/framework
var express = require('express');
//import the express library
var app = express();
app.get('/', function(req, res) {
	//using get function, url is mapped with the parameter passed inside (/) 
    res.setHeader('Content-Type', 'text/plain');
    res.end('You\'re in reception');
});
app.listen(8081);

//-------------------------------------------------------------

//code to handle dynamic routes 
app.get('/floor/:floornum/bedroom', function(req, res) {
	//looks for the url with /floor/23/bedroom
    res.setHeader('Content-Type', 'text/plain');
    //Sets the type of data to be sent to the client
    //In this case, its text/plain
    res.end('You\’re in the bedroom on floor number' + req.params.floornum);
});

//-------------------------------------------------------------

//code to use EJS framework
//This allows to have an html in another folder named views.
var express = require('express');
var app = express();
app.get('/', function(req, res){
	//looks for url with root and then goes inside using app.get
	//this app.get is a function provided by express
  res.render('index.ejs');  
	//This interacts with html page saved in index.ejs file under Views folder
});
app.get('/count/:number', function(req, res) {
	//looks for the url with localhost:8083:/count/66 as the link
    var names = ['Robert', 'Jack', 'David'];
    //creating an array names with three elements
    res.render('bedroom.ejs', {counter: req.params.number, names: names});
    //this interacts with bedroom.ejs file which has the html content
    //counter and names are passed on to that html file
});
app.listen(8083);
//port 8083 is used for listening

//-------------------------------------------------------------

var express = require('express');
var session = require('cookie-session'); // Loads the piece of middleware for sessions
var bodyParser = require('body-parser'); // Loads the piece of middleware for managing the settings
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();


/* Using sessions */
app.use(session({secret: 'todotopsecret'}))


/* If there is no to do list in the session, 
we create an empty one in the form of an array before continuing */
.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})

/* The to do list and the form are displayed */
.get('/todo', function(req, res) { 
    res.render('todo.ejs', {todolist: req.session.todolist});
})

/* Adding an item to the to do list */
.post('/todo/add/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})

/* Deletes an item from the to do list */
.get('/todo/delete/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})

/* Redirects to the to do list if the page requested is not found */
.use(function(req, res, next){
    res.redirect('/todo');
})

.listen(8085);

//----------------------------------------------------------

<!DOCTYPE html>

<html>
    <head>
        <title>My todolist</title>
        <style>
            a {text-decoration: none; color: black;}
        </style>
    </head>

    <body>
        <h1>My todolist</h1>

        <ul>
        <% todolist.forEach(function(todo, index) { %>
            <li><a href="/todo/delete/<%= index %>">✘</a> <%= todo %></li>
        <% }); %>
        </ul>

        <form action="/todo/add/" method="post"> <label for="newtodo">What should I do?</label>
                <input type="text" name="newtodo" id="newtodo" autofocus />
                <input type="submit" />
            </p>
        </form>
    </body>
</html>

//---------------------------------------------------------

//Getting multiple parameters from URL
// grab the packages we need
var express = require('express');
var app = express();
var port = process.env.PORT || 8079;

// routes will go here

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);

app.get('/api/users', function(req, res) {
  var user_id = req.param('id');
  var token = req.param('token');
  var geo = req.param('geo');  
  res.send(user_id + ' ' + token + ' ' + geo);
});

//Type this in URL to see the results
//http://localhost:8079/api/users?id=4&token=sdfa3&geo=us
