class ListService {

    static getAll(media, userId) {
        const sql = ListQueryBuilder.buildSelectQuery(media, userId);
        return connection.queryAsync(sql)
            .catch(err => console.log(err.sqlMessage));
    }

    static insert(media, userId, mediaId) {
        const sql = ListQueryBuilder.buildUpdateQuery(media, userId, mediaId);
        return connection.queryAsync(sql)
            .catch(err => console.log(err.sqlMessage));
    }

    static delete(media, userId, mediaId) {
        const sql = ListQueryBuilder.buildDeleteQuery(media, userId, mediaId);
        return connection.queryAsync(sql)
            .catch(err => console.log(err.sqlMessage));
    }

}


class ListQueryBuilder {

    static buildSelectQuery(media, userId) {
        const fullMediaName = media === 'show' ? 'tv_' + media : media;
        const tableName = ListQueryBuilder.buildTableName(media);
        return `select movie_id, title, language, poster
                        vote_average, release_date from ${fullMediaName} 
                        inner join ${tableName} on 
                        ${tableName}.${media}_id = ${fullMediaName}.id 
                        where user_id = ${userId}`;
    }

    static buildUpdateQuery(media, userId, mediaId) {
        const tableName = ListQueryBuilder.buildTableName(media);
        return `insert into ${tableName} 
                      (${media}_id, user_id) values (${mediaId}, ${userId});`;
    }

    static buildDeleteQuery(media, userId, mediaId) {
        const tableName = ListQueryBuilder.buildTableName(media);
        return `delete from ${tableName} 
                     where user_id = ${userId} and ${media}_id = ${mediaId}`;
    }


    static buildTableName(media) {
        return media + '_watch_list';
    }
}

export default ListService;
