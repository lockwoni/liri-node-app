// SETUP VARIABLES
// Using the require keyword to access my keys
var twitterKeys = require("./keys.js");

// Storing the Twitter keys in variables
var twitterKeysObj = twitterKeys.twitterKeys;
var consumerKey = twitterKeys.twitterKeys.consumer_key;
var consumerSec = twitterKeys.twitterKeys.consumer_secret;
var accessKey = twitterKeys.twitterKeys.access_token_key;
var accessSecret = twitterKeys.twitterKeys.access_token_secret;

// Including the twitter, spotify, & request NPM packages
//var twitter = require("twitter");
//var spotify = require("spotify");
//var request = require("request");

// Creating variables that will be used to call functions from terminal
var inputString = process.argv;
var userCommand = inputString[2];
var userRequest = inputString[3];

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// FUNCTIONS


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// MAIN PROCESSES
if (userCommand === "my-tweets") {
	// Console logging last 20 tweets

}
else if (userCommand === "spotify-this-song") {
	// Console logging info about the song in your terminal/bash window

	// If no song is provided, defaulting to Ace of Base
}
else if (userCommand === "movie-this") {
	// Console logging info about the movie in your terminal/bash window

	// If no movie is provided, defaulting to 'Mr. Nobody.'
}
else if (userCommand === "do-what-it-says") {
	// Using the fs Node package, LIRI takes the text inside of random.txt and then uses it to call one of LIRI's commands

	
}
else {
	console.log("Not a recognized command");
}
