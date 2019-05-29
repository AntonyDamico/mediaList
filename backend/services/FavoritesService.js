class FavoritesService {

    static getAll(media, userId) {
        const tableName = FavoritesService.buildTableName(media);
        const mediaName = media === 'show' ? 'tv_' + media : media;

        return knex(tableName)
            .innerJoin(mediaName, `${mediaName}.id`, '=', `${tableName}.${media}_id`)
            .where('user_id', userId);
    }


    static insert(media, userId, mediaId) {
        const tableName = FavoritesService.buildTableName(media);
        const insertObj = FavoritesService.getOperationsObj(media, userId, mediaId);
        return knex(tableName).insert(insertObj);
    }


    static delete(media, userId, mediaId) {

        const tableName = FavoritesService.buildTableName(media);
        const whereObj = FavoritesService.getOperationsObj(media, userId, mediaId);
        return knex(tableName)
            .where(whereObj).del();
    }

    static buildTableName(media) {
        return 'favorite_' + media + 's';
    }

    static getOperationsObj(media, userId, mediaId) {
        return {
            user_id: userId,
            [media + '_id']: mediaId
        };
    }
}

export default FavoritesService;
