// Add code to read and set any environment variables with the dotenv package
require("dotenv").config();

// Add the code required to import the `keys.js` file and store it in a variable.
var keys = require('./keys');

// fs is a core Node package for reading and writing files
var fs = require("fs");



// Make it so liri.js can take in one of the following commands
// `my-tweets`
// `spotify-this-song`
// `movie-this`
// `do-what-it-says`



// Store require in var
var request = require("request");

// Store commands in vars
var action = process.argv[2];
var title = process.argv[3];



// Call functions according to commands
// Append commands to log.txt

// TWITTER
if (action === 'my-tweets') {
    fs.appendFile('log.txt', '\n' + '\n' + 'COMMAND: ' + action + '\n', function(err) {
        if (err) {
            console.log(err);
        }
    });
    getTweets();
}

// SPOTIFY
else if (action === 'spotify-this-song') {
    // Search by keyword if provided
    if (title) {
        fs.appendFile('log.txt', '\n' + '\n' + 'COMMAND: ' + action + ', "' + title + '"' + '\n', function(err) {
            if (err) {
                console.log(err);
            }
        });
        getSong(title);
    }
    // * Otherwise, default to "The Sign" by Ace of Base.
    else {
        fs.appendFile('log.txt', '\n' + '\n' + 'COMMAND: ' + action + ', "The Sign" by Ace of Base' + '\n', function(err) {
            if (err) {
                console.log(err);
            }
        });
        getSong('The Sign Ace of Base')
    }
}

// OMDB
else if (action === 'movie-this') {
    // If the user enters a movie, output data for that movie
    if (title) {
        fs.appendFile('log.txt', '\n' + '\n' + 'COMMAND: ' + action + ', "' + title + '"' + '\n', function(err) {
            if (err) {
                console.log(err);
            }
        });
        getMovie(title);
    }
    // Otherwise, output data for the movie 'Mr. Nobody.'
    else {
        fs.appendFile('log.txt', '\n' + '\n' + 'COMMAND: ' + action + ', "Mr.Nobody"' + '\n', function(err) {
            if (err) {
                console.log(err);
            }
        });
        getMovie('Mr.Nobody');
    }
}

// GET COMMAND FROM log.txt
else if (action === 'do-what-it-says') {
    doWhatItSays();
}



// Twitter function
function getTweets() {

    var Twitter = require('twitter');

    // Access keys information
    var client = new Twitter(keys.twitter);

    // Get tweets
    var params = {screen_name: 'StefLiri'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log('\n' + 'MOST RECENT TWEETS: ' + '\n');

            // Loop through tweets for text and date created
            for (var i=0; i < tweets.length; i++) {

                var myTweet = tweets[i].text;
                var myTweetDate = tweets[i].created_at.substring(0, 19);

                // Log tweets to console
                console.log(
                    myTweet + '\n' +
                    myTweetDate + '\n' +
                    '--------------------------------'
                );

                // Append tweets to log.txt
                fs.appendFile('log.txt', '\n' + myTweet + '\n' + myTweetDate + '\n' + '--------------------------------', function(err) {
                    if (err) {
                        console.log(err);
                    }
                })
            }
            console.log('\n');
        }
    });
}



// Spotify function
function getSong(title) {

    // Import the spotify API
    var Spotify = require('node-spotify-api');

    // Access keys information
    var spotify = new Spotify(keys.spotify);

    // Build query string
    title = title.replace(' ', '+');

    // Search spotify
    spotify
        .search({ type: 'track', query: title })
        .then(function(response) {

            // console.log(response);
            // console.log(response.tracks.items[0]);

            // Use first result
            var firstResult = response.tracks.items[0];

            // Store song information
            var artist = firstResult.artists[0].name;
            var songName = firstResult.name;
            var previewLink = firstResult.href;
            var album = firstResult.album.name;

            // Log song info to console
            console.log(
                '\n' +
                'SPOTIFY SONG:' +
                '\n'
            );
            // * Artist(s)
            console.log('Artist: ' + artist);
            // * The song's name
            console.log('Song name: ' + songName);
            // * A preview link of the song from Spotify
            console.log('Preview link: ' + previewLink);
            // * The album that the song is from
            console.log('Album: ' + album);
            console.log(
                '\n' + '--------------------------------' + '\n' + '\n'
            );

            // Append song info to log.txt
            fs.appendFile('log.txt', 
                '\n' +
                'Artist: ' + artist + '\n' +
                'Song name: ' + songName + '\n' +
                'Preview link: ' + previewLink + '\n' +
                'Album: ' + album + '\n' + '\n'
                + '--------------------------------',
                function(err) {
                    if (err) {
                        console.log(err);
                    }
                }
            )

        })
        .catch(function(err) {
            console.log(err);
        });
}



// OMDB function
function getMovie(title) {

    // Build query string
    title = title.replace(' ', '+');

    // Run a request to the OMDB API with the movie specified
    request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

        // console.log(JSON.parse(body));

        // Store movie information
        var title = JSON.parse(body).Title;
        var year = JSON.parse(body).Year;
        var imdbRating = JSON.parse(body).imdbRating;
        var rottenTomatoesRating = JSON.parse(body).Ratings[1].Value;
        var productionCountry = JSON.parse(body).Country;
        var language = JSON.parse(body).Language;
        var plot = JSON.parse(body).Plot;
        var actors = JSON.parse(body).Actors;

        // Log info to console
        console.log(
            '\n' +
            'OMDB MOVIE:' +
            '\n'
        )
        // * Title of the movie.
        console.log('Title of the movie: ' + title);
        // * Year the movie came out.
        console.log("Movie's release year: " + year);
        // * IMDB Rating of the movie.
        console.log("IMDB rating: " + imdbRating);
        // * Rotten Tomatoes Rating of the movie.
        console.log("Rotten Tomatoes rating: " + rottenTomatoesRating);
        // * Country where the movie was produced.
        console.log("Production country: " + productionCountry);
        // * Language of the movie.
        console.log("Language: " + language);
        // * Plot of the movie.
        console.log("Plot: " + plot);
        // * Actors in the movie.
        console.log("Actors: " + actors);
        console.log(
            '\n' + '--------------------------------' + '\n' + '\n'
        );

        // Append info to log.txt
        fs.appendFile('log.txt', 
        '\n' +
        'Title of the movie: ' + title + '\n' +
        "Movie's release year: " + year + '\n' +
        'IMDB rating: ' + imdbRating + '\n' +
        'Rotten Tomatoes rating: ' + rottenTomatoesRating + '\n' +
        'Production country: ' + productionCountry + '\n' +
        'Language: ' + language + '\n' +
        'Plot: ' + plot + '\n' +
        'Actors: ' + actors + '\n' + '\n'
        + '--------------------------------',
        function(err) {
            if (err) {
                console.log(err);
            }
        }
    )
    }
  });
}



// Function to read commands in random.txt and call appropriate functions
function doWhatItSays() {

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

        // Then split it on commas into an array
        var dataArr = data.split(",");

        // Match first item in array to command, second item to title if applicable
        // Append command to log.txt
        // Call appropriate function

        // TWITTER
        if (dataArr[0] === 'my-tweets') {
            fs.appendFile('log.txt', '\n' + '\n' + 'COMMAND: ' + action + ' > "' + dataArr[0] + '"\n', function(err) {
                if (err) {
                    console.log(err);
                }
            });
            getTweets();
        }

        // SPOTIFY
        else if ( (dataArr[0] === 'spotify-this-song') && (dataArr[1]) ) {
            title = dataArr[1];
            fs.appendFile('log.txt', '\n' + '\n' + 'COMMAND: ' + action + ' > "' + dataArr[0] + ', ' + title + '"' + '\n', function(err) {
                if (err) {
                    console.log(err);
                }
            });
            getSong(title);
        }
        else if ( (dataArr[0] === 'spotify-this-song') && (!dataArr[1]) ) {
            fs.appendFile('log.txt', '\n' + '\n' + 'COMMAND: ' + action + ' > "' + dataArr[0] + ', "The Sign" by Ace of Base' + '"\n', function(err) {
                if (err) {
                    console.log(err);
                }
            });
            getSong('The Sign Ace of Base');
        }

        // OMDB
        else if ( (dataArr[0] === 'movie-this') && (dataArr[1]) ) {
            title = dataArr[1];
            fs.appendFile('log.txt', '\n' + '\n' + 'COMMAND: ' + action + ' > "' + dataArr[0] + ', ' + title + '"\n', function(err) {
                if (err) {
                    console.log(err);
                }
            });
            getMovie(title);
        }
        else if ( (dataArr[0] === 'movie-this') && (!dataArr[1]) ) {
            fs.appendFile('log.txt', '\n' + '\n' + 'COMMAND: ' + action + ' > "' + dataArr[0] + ', "Mr.Nobody"' + '"\n', function(err) {
                if (err) {
                    console.log(err);
                }
            });
            getMovie('Mr.Nobody');
        }

        // Would this work??
        // action = dataArr[0];
        // if (dataArr[1]) {
        //     title = dataArr[1];
        // }
    })
}

