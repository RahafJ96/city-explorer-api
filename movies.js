const axios = require('axios');

const movies = {};
const myMemory={};

movies.handelMovies = function(req, res) {
    const city = req.query.city

    if(myMemory[city] != undefined){
        console.log('Got data from the Memory');
        res.send(myMemory[city]);
    }else{
        const URLMovie = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_KEY}&query=${city}`
        
    {
    axios
        .get(URLMovie)
        .then(movieStatus => {
            let moviesArray = movieStatus.data.results

            res.send(movies.moviesForObject(moviesArray));
        })
        .catch(err => {
            res.send(err);
        })
}
}


movies.moviesForObject = (moviesObj) => {

    const forMoviesObj = [];
    moviesObj.map(element => {
        myMemory[city] = forMoviesObj;
        const title = element.title
        const overview = element.overview
        const vote_average = element.vote_average
        const vote_count = element.vote_count
        const poster_path = process.env.IMG_URL+element.poster_path
        const popularity = element.popularity
        const release_date = element.release_date

        forMoviesObj.push(new Movies(title, overview, vote_average, vote_count, poster_path, popularity, release_date));

        console.log(forMoviesObj);
    });
    return forMoviesObj;
}
    }

class Movies {
    constructor(title, overview, vote_average, vote_count, poster_path, popularity, release_date) {
        this.title = title
        this.overview = overview
        this.vote_average = vote_average
        this.vote_count = vote_count
        this.poster_path = poster_path
        this.popularity = popularity
        this.release_date = release_date
    }
}

module.exports = movies;
