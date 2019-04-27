class MovieDbController {

    searchMovie(req, res) {
        const movieTitle = req.body.title;
        mdb.searchMovie({})
    }
}
