class MovieDbController {

    searchMovie(req, res) {
        console.log('here');
        console.log(req.body);
        const movieTitle = req.body.title;
        mdb.searchMovie({query: movieTitle}, (err, movieRes) => {
            if (err) throw err;
            res.status(200).send({
                data: movieRes.results
            })
        })
    }
}

export default new MovieDbController();
