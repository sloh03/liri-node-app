# liri-node-app

LIRI is a Language Interpretation and Recognition Interface, a command line node app that takes in parameters and gives you back data.

To retrieve data that will power this app, you will need to obtain keys and send requests to the following APIs (links are provided in materials sources below):
* Twitter
* Spotify
* OMDB

## Function

The app will take the following commands:

* `my-tweets`

* `spotify-this-song`

* `movie-this`

* `do-what-it-says`

### What Each Command Does

####  1. `node liri.js my-tweets`
* Shows the following information about the 20 most recent tweets:
    * Text
    * Date created

#### 2. `node liri.js spotify-this-song '<song name here>'`
* Shows the following information about the song:
    * Artist
    * Name
    * Album
    * Preview link
* Information defaults to "The Sign" by Ace of Base if no song name is provided

#### 3. `node liri.js movie-this '<movie name here>'`
* Shows the following information about the movie.
    * Title
    * Year
    * IMDB rating
    * Rotten Tomatoes rating
    * Production country
    * Language
    * Plot
    * Actors
* Information defaults to "Mr. Nobody" if no movie name is provided

#### 4. `node liri.js do-what-it-says`
* Using the `fs` Node package, LIRI will take the text inside of `random.txt` and use it to call one of LIRI's commands

## Bonus Feature
In addition to the terminal/bash window, both the commands and the data output are stored and accessible in a .txt file called `log.txt`.

## Languages and Libraries Used
* Node.js

## Materials Sources
* [Twitter](https://www.npmjs.com/package/twitter)

* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

* [Request](https://www.npmjs.com/package/request)

* [OMDB API](http://www.omdbapi.com)

* [DotEnv](https://www.npmjs.com/package/dotenv)












