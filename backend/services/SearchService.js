class SearchService {

    static search(term) {
        return knex('movie')
            .where('title', 'like', '%' + term +'%')
    }
}

export default SearchService;
