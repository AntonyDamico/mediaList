class RatingService {

    static getAll(media, userId) {
        const tableName = RatingService.buildTableName(media);
        const mediaName = media === 'show' ? 'tv_' + media : media;

        return knex(mediaName)
            .innerJoin(tableName, `${tableName}.${media}_id`, '=', `${mediaName}.id`)
            .where('user_id', userId);
    }

    static insert(media, user_id, mediaId) {
        const insertObj = {
            user_id,
            [media + '_id']: mediaId
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

}


export default RatingService;
