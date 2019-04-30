class UserMediaActionsService {

    static getFavorites(media, userId) {
        const tableName = 'favorite_' + media + 's';
        const mediaName = media === 'show' ? 'tv_' + media : media;

        return knex(tableName)
            .innerJoin(mediaName, `${mediaName}.id`, '=', `${tableName}.${mediaName}_id`)
            .where('user_id', userId);
    }


    static addToFavorite(media, userId, mediaId) {
        const sql = `SELECT * FROM favorite_movies where user_id = ${userId}`;
        return connection.queryAsync(sql)
            .catch(err => console.log(err.sqlMessage));
    }
}

export default UserMediaActionsService;
