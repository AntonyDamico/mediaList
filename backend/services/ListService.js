class ListService {

    static getAll(media, userId) {
        const sql = `select * from movie 
                        inner join movie_watch_list on movie_watch_list.movie_id = movie.id 
                        where user_id = 1 `;

        return new Promise((resolve, reject) => {
            connection.query(sql, (err, res) => {
                if (err) return reject(err);
                resolve(res)
            })
        });
    }

    static insert(mediaType, userId, movieId) {
        const sql = `insert into movie_watch_list (movie_id, user_id) values (${movieId}, ${userId});`

        return new Promise(((resolve, reject) => {
            connection.query(sql, (err, res) => {
                if(err) return reject(err);
                resolve(res);
            })
        }))
    }
}

export default ListService;
