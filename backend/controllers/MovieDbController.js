class MovieDbController {

    searchMovie(req, res) {
        console.log('here');
        console.log(req.query);
        // const movieTitle = req.body.title;
        const searchQuery = req.query.search
        mdb.movieInfo({id: searchQuery}, (err, movieRes) => {
            if (err) throw err;
            console.log('jfsafljlkjdslkf')
            res.status(200).send({
                data: movieRes.results
            })
        })
    }
}

export default new MovieDbController();
