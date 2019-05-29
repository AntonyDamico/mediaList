class SearchService {

    static search(term, media) {
        return knex(media)
            .where('title', 'like', '%' + term +'%')
            .limit(30)
    }
}

export default SearchService;
