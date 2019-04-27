class ListService {

    static getAll(media, userId) {
        const names = ListService.buildQueryNames(media);
        const sql = `select movie_id, title, language, poster
                        vote_average, release_date from ${names.fullMediaName} 
                        inner join ${names.listTableName} on 
                        ${names.listTableName}.${media}_id = ${names.fullMediaName}.id 
                        where user_id = ${userId}`;

        return connection.queryAsync(sql)
            .catch(err => console.log(err.sqlMessage));

    }

    static insert(media, userId, mediaId) {
        const names = ListService.buildQueryNames(media);
        const sql = `insert into ${names.listTableName} 
                      (${media}_id, user_id) values (${mediaId}, ${userId});`;

        return connection.queryAsync(sql)
            .catch(err => console.log(err.sqlMessage));
    }

    static delete(media, userId, mediaId) {
        const names = ListService.buildQueryNames(media);
        const sql = `delete from ${names.listTableName} 
                     where user_id = ${userId} and ${media}_id = ${mediaId}`

        return connection.queryAsync(sql)
            .catch(err => console.log(err.sqlMessage));
    }


    static buildQueryNames(media) {
        let fullMediaName = media === 'show' ? 'tv_' + media : media;
        let listTableName = media + '_watch_list';
        return {fullMediaName, listTableName};
    }
}

export default ListService;
