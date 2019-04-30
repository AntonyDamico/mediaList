class ListService {

    static getAll(media, userId) {
        const tableName = ListService.buildTableName(media);
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

        return knex(ListService.buildTableName(media))
            .insert(insertObj)
    }

    static delete(media, userId, mediaId) {
        //     const sql = ListService.buildDeleteQuery(media, userId, mediaId);
        //     return connection.queryAsync(sql)
        //         .catch(err => console.log(err.sqlMessage));
    }

    static buildTableName(media) {
        return media + '_watch_list';
    }

}


// class ListService {
//
//     static buildDeleteQuery(media, userId, mediaId) {
//         const tableName = ListService.buildTableName(media);
//         return `delete from ${tableName}
//                      where user_id = ${userId} and ${media}_id = ${mediaId}`;
//     }
//
//
//
// }

export default ListService;
