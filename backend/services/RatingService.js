class RatingService {

    static getAll(media, userId) {
        const tableName = RatingService.buildTableName(media);
        const mediaName = media === 'show' ? 'tv_' + media : media;

        return knex(mediaName)
            .innerJoin(tableName, `${tableName}.${media}_id`, '=', `${mediaName}.id`)
            .where('user_id', userId);
    }

    static getById(media, mediaId, userId) {
        const mediaName = media === 'show' ? 'tv_' + media : media;
        return RatingService.getAll(media, userId)
            .where(`${mediaName}_id`, mediaId)
    }

    static async filterByRating(stars) {
        let start, end;
        stars = parseInt(stars);
        if (stars === 5) {
            start = 9;
            end = 10;
        } else if (stars === 4) {
            start = 7;
            end = 8;
        } else if (stars === 3) {
            start = 5;
            end = 6;
        } else if (stars === 2) {
            start = 4;
            end = 3;
        } else {
            start = 1;
            end = 2;
        }

        console.log(start, end)

        let movies;
        let shows;
        movies = await knex('movie')
        // .where('vote_average', '>=', start)
        // .where('release_date', '<=', end)
            .whereBetween('vote_average', [start, end])
            .orderByRaw('RAND()')
            .limit(20);

        shows = await knex('tv_show')
        // .where('vote_average', '>=', start)
        // .where('release_date', '<=', end)
            .whereBetween('vote_average', [start, end])
            .orderByRaw('RAND()')
            .limit(20);

        return RatingService.mergeMedia(movies, shows);
    }

    static insert(media, user_id, mediaId, rating) {
        const insertObj = {
            user_id,
            [media + '_id']: mediaId,
            rating
        };

        return knex(RatingService.buildTableName(media))
            .insert(insertObj)
    }

    static delete(media, userId, mediaId) {
        const tableName = RatingService.buildTableName(media);
        const whereObj = RatingService.getOperationsObj(media, userId, mediaId);
        return knex(tableName)
            .where(whereObj).del();
    }

    static buildTableName(media) {
        return media + '_rating';
    }

    static getOperationsObj(media, userId, mediaId) {
        return {
            user_id: userId,
            [media + '_id']: mediaId
        }
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


export default RatingService;
