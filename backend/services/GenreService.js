class GenreService {

    static getById(id) {
        return knex('genre').where('id', id);
    }

    static getAllGenres() {
        return knex('genre')
    }

    static async filterByGenre(genreId, mediaType) {
        const movieData = await knex('movie')
            .innerJoin('movie_genre', 'movie.id', '=', 'movie_genre.movie_id')
            .where('genre_id', genreId)
            .orderBy('vote_average', 'desc')
            .limit(15);
        const showData = await knex('tv_show')
            .innerJoin('show_genre', 'tv_show.id', '=', 'show_genre.show_id')
            .where('genre_id', genreId)
            .orderBy('vote_average', 'desc').limit(15);
        return GenreService.mergeMedia(movieData, showData);
    }


    static mergeMedia(movies, shows) {
        movies.forEach(elem => {
            elem['mediaType'] = 'movie';
            elem.id = elem['movie_id']
        });
        shows.forEach(elem => {
            elem['mediaType'] = 'show';
            elem.id = elem['show_id'];
        });
        return movies.concat(shows);
    }
}

export default GenreService;
