const axios = require('axios');

const Movie = {};

const movieMemory={};

 Movie.handelMovies = function(req, res) {
     let movieArr=[];

    let {city}=req.query;
    // const city = req.query.city
    if(movieMemory[city]!== undefined){
        console.log('Movie data from Memory');
        res.send(movieMemory[city]);
    }
    else
    {
        
    const URLMovie = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_KEY}&query=${city}`
    try{
        let axiosMovies=await axios.get(URLMovie);
        axiosMovies.data.results.map(element=>movieArr.push(new Movies(element)));
        console.log('Moive data from API');
        movieMemory[city]=movieArr;
        res.status(200).send(movieArr);
    }

    catch(error){
        res.status(400)
        if(error.status){
            res.status(error.status).send(error.message);
        }
    }


    // axios
    //     .get(URLMovie)
    //     .then(movieStatus => {
    //         let moviesArray = movieStatus.data.results
    //         console.log('Movie data from API');

    //         res.send(Movie.moviesForObject(moviesArray));
    //     })
    //     .catch(err => {
    //         res.send(err);
    //     })
    }
}


// Movie.moviesForObject = (moviesObj) => {

//     const forMoviesObj = [];

//     moviesObj.map(element => {

//         const title = element.title
//         const overview = element.overview
//         const vote_average = element.vote_average
//         const vote_count = element.vote_count
//         const poster_path = process.env.IMG_URL+element.poster_path
//         const popularity = element.popularity
//         const release_date = element.release_date

//         forMoviesObj.push(new Movies(title, overview, vote_average, vote_count, poster_path, popularity, release_date));

//         console.log(forMoviesObj);
//     });
//     return forMoviesObj;
// }


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

module.exports = Movie;
