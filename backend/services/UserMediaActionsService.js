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
        const insertObj = {
            user_id: userId,
            [media + '_id']: mediaId
        };
        return knex(tableName).insert(insertObj);
    }

    static buildTableName(media) {
        return 'favorite_' + media + 's';
    }
}

export default UserMediaActionsService;
