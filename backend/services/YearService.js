class YearService {

    static async getMediaByYear(start, end) {
        if (!start) start = 1000;
        if (!end) end = 3000;

        let movies;
        let shows;

        if (end > 2020) {
             movies = await knex('movie')
                .where('release_date', '>', start)
                .orderByRaw('RAND()')
                .limit(20);

            shows = await knex('tv_show')
                .where('release_date', '>', start)
                .orderByRaw('RAND()')
                .limit(20);
            console.log(typeof movies);
        } else {
            movies = await knex('movie')
                .where('release_date', '>', start)
                .where('release_date', '<', end)
                .orderByRaw('RAND()')
                .limit(20);

            shows = await knex('tv_show')
                .where('release_date', '>', start)
                .where('release_date', '<', end)
                .orderByRaw('RAND()')
                .limit(20);
            console.log(typeof movies);
        }
        return YearService.mergeMedia(movies, shows);
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

export default YearService;
