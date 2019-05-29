class MediaService {

    static getAll(media, userId) {
        const tableName = MediaService.buildTableName(media);
        const mediaName = media === 'show' ? 'tv_' + media : media;

        return knex(mediaName)
    }

    static getTrending(media, limit=50) {
        const mediaName = media === 'show' ? 'tv_' + media : media;
        return knex(mediaName)
            .where('language', 'en')
            .where('release_date', '>', '2000-01-01')
            .orderBy('vote_average', 'desc')
            // .where('vote_average', '>', '8')
            .limit(limit)
    }

    static getMedia(media, id) {
        const mediaName = media === 'show' ? 'tv_' + media : media;
        return knex(mediaName)
            .where('id', id);
    }

    static buildTableName(media) {
        return media + '_watch_list';
    }

}


export default MediaService;
