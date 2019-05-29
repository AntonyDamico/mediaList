class GenreService {

    static getById(id) {
        return knex('genre').where('id', id);
    }

    static getAllGenres() {
        return knex('genre')
    }

    static async filterByGenre(genreId) {
        const movieData = await knex('movie')
            .innerJoin('movie_genre', 'movie.id', '=', 'movie_genre.movie_id')
            .where('genre_id', genreId)
            .orderBy('vote_average', 'desc');
        const showData = await knex('tv_show')
            .innerJoin('show_genre', 'tv_show.id', '=', 'show_genre.show_id')
            .where('genre_id', genreId)
            .orderBy('vote_average', 'desc');
        return Object.assign(movieData, showData);
    }
}

export default GenreService;
