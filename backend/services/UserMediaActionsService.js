class UserMediaActionsService {

    static getFavorites(media, userId) {
        const tableName = UserMediaActionsService.buildTableName(media);
        const mediaName = media === 'show' ? 'tv_' + media : media;

        return knex(tableName)
            .innerJoin(mediaName, `${mediaName}.id`, '=', `${tableName}.${media}_id`)
            .where('user_id', userId);
    }


    static addToFavorite(media, userId, mediaId) {
        const tableName = UserMediaActionsService.buildTableName(media);
        const insertObj = UserMediaActionsService.getOperationsObj(media, userId, mediaId);
        return knex(tableName).insert(insertObj);
    }


    static removeFromFavorites(media, userId, mediaId) {
        const tableName = UserMediaActionsService.buildTableName(media);
        const whereObj = UserMediaActionsService.getOperationsObj(media, userId, mediaId);
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

export default UserMediaActionsService;
