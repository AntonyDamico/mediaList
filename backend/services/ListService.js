class ListService {

    static getAll(media, userId, callback) {
        const sql = `select * from movie 
                        inner join movie_watch_list on movie_watch_list.movie_id = movie.id 
                        where user_id = 1 `;
        connection.query(sql, (err, res) => {
            if (err) return err;
            callback(res);
        })
    }
}

export default ListService;
