class MediaService {

    static getAll(media, userId) {
        const tableName = MediaService.buildTableName(media);
        const mediaName = media === 'show' ? 'tv_' + media : media;

        return knex(mediaName)
    }

    static getTrending(media) {
        const mediaName = media === 'show' ? 'tv_' + media : media;
        return knex(mediaName)
            .where('language', 'en')
            .orderBy('vote_average', 'desc')
            .limit(7)
    }

    static getMedia(media, id) {
        const mediaName = media === 'show' ? 'tv_' + media : media;
        return knex(mediaName)
            .where('id', id);
    }

    static buildTableName(media) {
        return media + '_watch_list';
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


export default MediaService;
