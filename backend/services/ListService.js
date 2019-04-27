class ListService {

    static getAll(media, userId) {
        const names = ListService.buildQueryNames(media);
        const sql = `select movie_id, title, language, poster
                        vote_average, release_date from ${names.fullMediaName} 
                        inner join ${names.listTableName} on 
                        ${names.listTableName}.${media}_id = ${names.fullMediaName}.id 
                        where user_id = ${userId}`;

        return new Promise((resolve, reject) => {
            connection.query(sql, (err, res) => {
                if (err) return reject(err);
                resolve(res)
            })
        });
    }

    static insert(media, userId, mediaId) {
        const names = ListService.buildQueryNames(media);
        const sql = `insert into ${names.listTableName} 
                      (${media}_id, user_id) values (${mediaId}, ${userId});`;

        return new Promise(((resolve, reject) => {
            connection.query(sql, (err, res) => {
                if (err) return reject(err);
                resolve(res);
            })
        }))
    }



    static buildQueryNames(media) {
        let fullMediaName = media === 'show' ? 'tv_' + media : media;
        let listTableName = media + '_watch_list';
        return {fullMediaName, listTableName};
    }
}

export default ListService;
