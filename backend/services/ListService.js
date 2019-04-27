class ListService {

    static getAll(media, userId) {
        const sql = `select * from movie 
                        inner join movie_watch_list on movie_watch_list.movie_id = movie.id 
                        where user_id = 1 `;
        return connection.queryAsync(sql)
            .catch(err => console.log(err.sqlMessage));
    }
}

export default ListService;
