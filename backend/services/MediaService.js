class ListService {

    static getAll(media, userId) {
        const tableName = ListService.buildTableName(media);
        const mediaName = media === 'show' ? 'tv_' + media : media;

        return knex(mediaName)
    }

    static getTrending(media) {
        const mediaName = media === 'show' ? 'tv_' + media : media;
        return knex(media)
            .where('language', 'en')
            .orderBy('vote_average', 'desc')
            .limit(7)
    }

    static buildTableName(media) {
        return media + '_watch_list';
    }

}


export default ListService;
