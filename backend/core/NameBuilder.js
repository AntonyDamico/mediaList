class NameBuilder {

    static buildWatchListTableName(media) {
        return media + '_watch_list';
    }

    static buildMediaFullName(media) {
        return media === 'show' ? 'tv_' + media : media;
    }
}


export default NameBuilder;
