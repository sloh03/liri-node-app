// Add code to read and set any environment variables with the dotenv package
require("dotenv").config();

// Add the code required to import the `keys.js` file and store it in a variable.
var keys = require('./keys');

// Make it so liri.js can take in one of the following commands
// `my-tweets`
// `spotify-this-song`
// `movie-this`
// `do-what-it-says`

var request = require("request");

var action = process.argv[2];
var title = process.argv[3];

if (action === 'my-tweets') {
    getTweets();
}
else if (action === 'spotify-this-song') {
    if (title) {
        getSong(title);
    }
    // * Otherwise, default to "The Sign" by Ace of Base.
    else {
        getSong('The Sign Ace of Base')
    }
}
else if (action === 'movie-this') {
    // If the user enters a movie, output data for that movie
    if (title) {
        getMovie(title);
    }
    // Otherwise, output data for the movie 'Mr. Nobody.'
    else {
        getMovie('Mr.Nobody');
    }
}
else if (action === 'do-what-it-says') {
    doWhatItSays();
}



function getTweets() {

    var Twitter = require('twitter');

    // Access your keys information
    var client = new Twitter(keys.twitter);

    var params = {screen_name: 'StefLiri'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(
                '\n' + 
                'MOST RECENT TWEETS: ' + '\n'
            );
            for (var i=0; i < tweets.length; i++)
            console.log(
                tweets[i].text + '\n' +
                tweets[i].created_at.substring(0, 19) + '\n' +
                '--------------------------------'
            );
            console.log(
                '\n'
            );
        }
    });
}



function getSong(title) {

    // Import the spotify API
    var Spotify = require('node-spotify-api');

    // Access your keys information
    var spotify = new Spotify(keys.spotify);

    title = title.replace(' ', '+');

    spotify
        .search({ type: 'track', query: title })
        .then(function(response) {

            // console.log(response);
            // console.log(response.tracks.items[0]);

            var firstResult = response.tracks.items[0];

            console.log(
                '\n' +
                'SPOTIFY SONG:' +
                '\n'
            );
            // * Artist(s)
            console.log('Artist: ' + firstResult.artists[0].name);
            // * The song's name
            console.log('Song name: ' + firstResult.name);
            // * A preview link of the song from Spotify
            console.log('Preview link: ' + firstResult.href);
            // * The album that the song is from
            console.log('Album: ' + firstResult.album.name);
            console.log(
                '\n' + '--------------------------------' + '\n' + '\n'
            );

        })
        .catch(function(err) {
            console.log(err);
        });
}



function getMovie(title) {

    title = title.replace(' ', '+');

    // Then run a request to the OMDB API with the movie specified
    request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

        // console.log(JSON.parse(body));

        console.log(
            '\n' +
            'OMDB MOVIE:' +
            '\n'
        )
        // * Title of the movie.
        console.log('Title of the movie: ' + JSON.parse(body).Title);
        // * Year the movie came out.
        console.log("Movie's release year: " + JSON.parse(body).Year);
        // * IMDB Rating of the movie.
        console.log("IMDB rating: " + JSON.parse(body).imdbRating);
        // * Rotten Tomatoes Rating of the movie.
        console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
        // * Country where the movie was produced.
        console.log("Production country: " + JSON.parse(body).Country);
        // * Language of the movie.
        console.log("Language: " + JSON.parse(body).Language);
        // * Plot of the movie.
        console.log("Plot: " + JSON.parse(body).Plot);
        // * Actors in the movie.
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log(
            '\n' + '--------------------------------' + '\n' + '\n'
        );
    }
  });
}



function doWhatItSays() {

    // fs is a core Node package for reading and writing files
    var fs = require("fs");

    // This block of code will read from the "random.txt" file.
    // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
    // The code will store the contents of the reading inside the variable "data"
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
        return console.log(error);
        }

        // We will then print the contents of data
        console.log(data);

        // Then split it on commas (to make it more readable) into an array
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        // console.log(dataArr);
        // console.log(dataArr[0]);
        // console.log(dataArr[1]);

        if (dataArr[0] === 'my-tweets') {
            getTweets();
        }
        else if ( (dataArr[0] === 'spotify-this-song') && (dataArr[1]) ) {
            title = dataArr[1];
            getSong(title);
        }
        else if ( (dataArr[0] === 'spotify-this-song') && (!dataArr[1]) ) {
            getSong('The Sign Ace of Base');
        }
        else if ( (dataArr[0] === 'movie-this') && (dataArr[1]) ) {
            title = dataArr[1];
            getMovie(title);
        }
        else if ( (dataArr[0] === 'movie-this') && (!dataArr[1]) ) {
            getMovie('Mr.Nobody');
        }

        // action = dataArr[0];
        // if (dataArr[1]) {
        //     title = dataArr[1];
        // }
    })
}

