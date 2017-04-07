// SETUP VARIABLES
// Including the twitter, spotify, request, & FS NPM packages
var Twitter = require("twitter");
//var moment = require("moment");
//var spotify = require("spotify");
var request = require("request");
var fs = require("fs");

// Using the require keyword to access my keys
var config = require("./keys.js");

// Storing the Twitter keys in variables
var client = new Twitter(config.twitterKeys);

// Creating variables to store the responses
var twitter;
var musicBody;
var music;
var omdb;

// Creating variables that will be used to call functions from terminal
var inputString = process.argv;
var userCommand = inputString[2];
var userRequest = inputString[3];

// Creating variables to format the song & movie inputs
var splitSong = [];
var songURL = "";

var splitMovie = [];
var movieURL = "";

/**********************************************/
// FUNCTIONS


/**********************************************/
// MAIN PROCESSES
if (userCommand === "my-tweets") {
	// Pulling and console logging my dog's last 20 tweets
	client.get("search/tweets", {q: "LexiLockwood2", count: 20, result_type: "recent"}, function(error,response) {
	  // If there is an error, logging it.
	  if (error) {
	    console.log(error);
	  }
		// If there is no error, printing out the tweets.
		tweets = response.statuses;
		//var tweetDate = 'Fri Apr 07 02:46:06 +0000 2017';
			//moment(tweetDate, 'ddd MMM DD HH:mm:ss ZZ YYYY', 'en');
			//moment(tweets[i].created_at).format('LT on L');

		for (var i = 0; i < tweets.length; i++) {
		 	console.log(i+1 + ") '" + tweets[i].text + "', created at " + tweets[i].created_at);
		};
	});
}
else if (userCommand === "spotify-this-song") {
	// Splitting & re-formatting user-entered song title string for use in the request URL
	if (inputString.length > 3) {
		splitSong = userRequest.split(" ");
		songURL = splitSong[0];
		for (var i = 1; i < splitSong.length; i++) {
			songURL = songURL + "%20" + splitSong[i];
		};

		// Requesting a song to play from Spotify and console logging info about the song to terminal
		request("https://api.spotify.com/v1/search?q=" + songURL + "&type=track&limit=1", function(error, response, body) {
	  	// If the request is successful
		  if (error) {
		    console.log(error);
		  }
		  // Parse the body of the site and recover the desired info
		  musicBody = JSON.parse(body);
		  music = musicBody.tracks.items[0];

		  console.log("%s \n%s \n%s \n%s", music.artists[0].name, music.name, music.preview_url, music.album.name);
		});
	}
	else {
		// If no song is provided, defaulting to Ace of Base
		request("https://api.spotify.com/v1/search?q=i%20saw%20the%20sign&type=track&limit=1", function(error, response, body) {
	  	// If the request is successful
		  if (error) {
		    console.log(error);
		  }
		  // Parse the body of the site and recover the desired info
		  musicBody = JSON.parse(body);
		  music = musicBody.tracks.items[0];

		  console.log("%s \n%s \n%s \n%s", music.artists[0].name, music.name, music.preview_url, music.album.name);
		});
	} 
}
else if (userCommand === "movie-this") {
	// Splitting & re-formatting user-entered movie title string for use in the request URL
	if (inputString.length > 3) {
		splitMovie = userRequest.split(" ");
		movieURL = splitMovie[0];
		for (var i = 1; i < splitMovie.length; i++) {
			movieURL = movieURL + "-" + splitMovie[i];
		};

		// Requesting info about the movie & console logging it to terminal
		request("http://www.omdbapi.com/?t=" + userRequest + "&y=&plot=short&r=json", function(error, response, body) {
	  	// If the request is successful
		  if (!error && response.statusCode === 200) {
		    // Parse the body of the site and recover the desired info
		    omdb = JSON.parse(body);

		    console.log("%s \n%s \n%s \n%s \n%s \n%s \n%s \n%s", omdb.Title, omdb.Year, omdb.imdbRating, omdb.Country, omdb.Language, omdb.Plot, omdb.Actors, omdb.Ratings[2].Value);
		  }
		});
	} 
	else {
		// If no movie is provided, defaulting to 'Mr. Nobody.'
		request("http://www.omdbapi.com/?t=mr-nobody&y=&plot=short&r=json", function(error, response, body) {
	  	// If the request is successful
		  if (!error && response.statusCode === 200) {
		    // Parse the body of the site and recover the desired info
		    omdb = JSON.parse(body);

		    console.log("%s \n%s \n%s \n%s \n%s \n%s \n%s \n%s", omdb.Title, omdb.Year, omdb.imdbRating, omdb.Country, omdb.Language, omdb.Plot, omdb.Actors, omdb.Ratings[2].Value);
		  }
		});
	};
}
else if (userCommand === "do-what-it-says") {
	// Using the fs Node package, LIRI takes the text inside of random.txt and then uses it to call one of LIRI's commands
	fs.readFile("../../random.txt", "utf8", function(err, data) {
		if (err) {
			console.log(err);
		}
		var dataArr = data.split(",");
		userCommand = dataArr[0];
		userRequest = dataArr[1];
		console.log(userCommand);
		console.log(userRequest);

		// Splitting & re-formatting user-entered song title string for use in the request URL
		songURL = userRequest;

		splitSong = userRequest.split(" ");
		songURL = splitSong[0];
		for (var i = 1; i < splitSong.length; i++) {
			songURL = songURL + "%20" + splitSong[i];
		};

		// Requesting a song to play from Spotify and console logging info about the song to terminal
		request("https://api.spotify.com/v1/search?q=" + songURL + "&type=track&limit=1", function(error, response, body) {
			// If the request is successful
			if (error) {
				console.log(error);
			}
			// Parse the body of the site and recover the desired info
			musicBody = JSON.parse(body);
			music = musicBody.tracks.items[0];

			console.log("%s \n%s \n%s \n%s", music.artists[0].name, music.name, music.preview_url, music.album.name);
		});
	});
}
else {
	console.log("Not a recognized command");
};
