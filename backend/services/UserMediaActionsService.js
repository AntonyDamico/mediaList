class UserMediaActionsService {

    static getFavorites(media, userId) {
        const sql = `SELECT * FROM favorite_movies WHERE user_id = ${userId}`;
        return connection.queryAsync(sql)
            .catch(err => console.log(err.sqlMessage));
    }


    static addToFavorite(media, userId, mediaId) {
        const sql = `SELECT * FROM favorite_movies where user_id = ${userId}`;
        return connection.queryAsync(sql)
            .catch(err => console.log(err.sqlMessage));
    }
}

export default UserMediaActionsService;
