class SearchService {

    static search(term, media) {
        return knex(media)
            .where('title', 'like', '%' + term +'%')
            .limit(15)
    }
}

export default SearchService;
