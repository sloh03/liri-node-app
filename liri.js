// Add code to read and set any environment variables with the dotenv package
require("dotenv").config();

// Add the code required to import the `keys.js` file and store it in a variable.
var keys = require('./keys');

// Access your keys information
// var spotify = new Spotify(keys.spotify);


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
    getSong(title);
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
            console.log(tweets);
        }
    });
    // request("twit"); // this is how we import the twit package

    // var config = require('./config') //this is we import the config file which is a js file which contains the keys ans tokens
    
    // var T = new Twit(config); //this is the object of twit which will help us to call functions inside it
    
    // var params = {
    //     q: 'akshay',
    //     count: 100
    // } // this is the param variable which will have key and value,the key is the keyword which we are interested in searching and count is the count of it
    // T.get('search/tweets', params,searchedData); // get is the function to search the tweet which three paramaters 'search/tweets',params and a callback function.
    
    // function searchedData(err, data, response) {
    //     console.log(data);
    // } // searchedData function is a callback function which returns the data when we make a search
}

function getMovie(title) {

    title = title.replace(' ', '+');

    // Then run a request to the OMDB API with the movie specified
    request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

        console.log(JSON.parse(body));

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
    }
  });
}

