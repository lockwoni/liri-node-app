// SETUP VARIABLES
// Including the twitter, spotify, request, & FS NPM packages
var Twitter = require("twitter");
var moment = require("moment");
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
// Creating function to pull and console log my dog's last 20 tweets
var myTweets = function() {
    client.get("search/tweets", { q: "LexiLockwood2", count: 20, result_type: "recent" }, function(error, response) {
        // If there is an error, console logging the error
        if (error) {
            console.log(error);
        }
        // If there is no error, printing out the tweets
        tweets = response.statuses;
        // Looping through the responses and console logging the desired info; also, using moment.js to format the created_at time
        console.log("Here are your last 20 tweets!");
        for (var i = 0; i < tweets.length; i++) {
            console.log("%s) '%s', created at %s", i + 1, tweets[i].text, moment(tweets[i].created_at, "ddd MMM DD HH:mm:ss ZZ YYYY").format("h:mma on M/D/YY"));
        };
    });
};

// Creating the function to split & re-format the user-entered song title string for use in the request URL
var splitSong = function() {
    splitSong = userRequest.split(" ");
    songURL = splitSong[0];
    for (var i = 1; i < splitSong.length; i++) {
        songURL = songURL + "%20" + splitSong[i];
    };
};

// Creating the function to request info about a song and console logging it to terminal
var spotifySong = function() {
    request("https://api.spotify.com/v1/search?q=" + songURL + "&type=track&limit=1", function(error, response, body) {
        // If there is an error, console logging the error
        if (error) {
            console.log(error);
        }
        // If no error, parse the body of the site and recover the desired info
        musicBody = JSON.parse(body);
        music = musicBody.tracks.items[0];
        // Console logging the desired info
        console.log("Here's your song info! \nArtist: %s \nSong: %s \nPreview link: %s \nAlbum: %s", music.artists[0].name, music.name, music.preview_url, music.album.name);
    });
};

// Creating the function to split and re-format the user-entered movie title string for use in the request URL
var splitMovie = function() {
    splitMovie = userRequest.split(" ");
    movieURL = splitMovie[0];
    for (var i = 1; i < splitMovie.length; i++) {
        movieURL = movieURL + "-" + splitMovie[i];
    };
};

// Creating the function to request info about the movie & console logging it to terminal
var omdbMovie = function() {
    request("http://www.omdbapi.com/?t=" + movieURL + "&y=&plot=short&r=json", function(error, response, body) {
        // If there is an error, console logging the error
        if (error) {
            console.log(error);
        }
        // If the request is successful
        else if (!error && response.statusCode === 200) {
            // Parse the body of the site and recover the desired info
            omdb = JSON.parse(body);
            // Console logging the desired info
            console.log("Here's your movie info! \nTitle: %s \nRelease Year: %s \nIMDB Rating: %s \nCountry: %s \nLanguage(s): %s \nPlot: %s \nActors: %s \nRotten Tomatoes Rating: %s", omdb.Title, omdb.Year, omdb.imdbRating, omdb.Country, omdb.Language, omdb.Plot, omdb.Actors, omdb.Ratings[2].Value);
        }
    });
};

// Creating the function to let the user know they entered an unknown command
var notRec = function() {
    console.log("Not a recognized command");
};
/**********************************************/
// MAIN PROCESSES
if (userCommand === "my-tweets") {
    // Calling the myTweets() function
    myTweets();
} else if (userCommand === "spotify-this-song") {
    // Determining what to do if the user inputted a song with the spotify command
    if (inputString.length > 3) {
        // Calling the splitSong() function to format the inputted song for the URL
        splitSong();
        // Calling the spotifySong() function
        spotifySong();
    } else {
        // If no song is provided, defaulting to Ace of Base's "The Sign"
        request("https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE", function(error, response, body) {
            // If there is an error, console logging the error
            if (error) {
                console.log(error);
            }
            // If no error, parse the body of the site and recover the desired info
            music = JSON.parse(body);
            // Console logging the desired info
            console.log("Here's your song info! \nArtist: %s \nSong: %s \nPreview link: %s \nAlbum: %s", music.artists[0].name, music.name, music.preview_url, music.album.name);
        });
    };
} else if (userCommand === "movie-this") {
    // Determining what to do if the user inputted a song with the movie-this command
    if (inputString.length > 3) {
        // Calling the splitMovie() function to format the inputted movie for the URL
        splitMovie();
        // Calling the omdbMovie() function
        omdbMovie();
    } else {
        // If no movie is provided, defaulting to 'Mr. Nobody.'
        movieURL = "mr-nobody";
        // Calling the omdbMovie() function
        omdbMovie();
    };
} else if (userCommand === "do-what-it-says") {
    // Using the fs Node package, LIRI takes the text inside of random.txt and then uses it to call one of LIRI's commands
    fs.readFile("../../random.txt", "utf8", function(err, data) {
        // If there is an error, console logging the error
        if (err) {
            console.log(err);
        }
        // If no error, parsing the text in the random.txt file and assigning the text to the appropriate command
        var dataArr = data.split(",");
        userCommand = dataArr[0];
        userRequest = dataArr[1];

        if (userCommand === "my-tweets") {
            // Calling the myTweets() function
            myTweets();
        } else if (userCommand === "spotify-this-song") {
            // Calling the splitSong() function to format the inputted song for the URL
            splitSong();
            // Calling the spotifySong() function
            spotifySong();
        } else if (userCommand === "movie-this") {
            // Calling the splitMovie() function to format the inputted movie for the URL
            splitMovie();
            // Calling the omdbMovie() function
            omdbMovie();
        } else {
            // Calling the notRec() function
            notRec();
        }
    });
} else {
    // Calling the notRec() function
    notRec();
};
