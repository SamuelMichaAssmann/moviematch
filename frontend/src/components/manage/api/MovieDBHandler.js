import APIHandler from './APIHandler'

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'd28d1550787892e34121c2918ec031b1';

class MovieDBHandler {

    /**
     * Performs a GET request to the MovieDB API and returns the results as an object.
     * @param {String} addUrl
     * @param {Object} args 
     */
    static async getRequest(addUrl, args={}) {
        return APIHandler.getRequest(`${BASE_URL}${addUrl}?api_key=${API_KEY}`, args);
    }

    /**
     * Returns a list of all genres supported by MovieDB.
     * Each entry in the list is an object: { id: Number, name: String }
     */
    static async getGenres() {
        let response = this.getRequest('genre/movie/list');
        return response['genres'];
    }

    /**
     * Returns various pieces of information for a movie with a certain ID.
     * @param {Number} id 
     */
    static async getMovieInfo(id) {
        return this.getRequest(`movie/${id}`);
    }

    /**
     * Finds movies according to the given criteria and returns a list of them.
     * Set any of the parameters to null to exclude them.
     * @param {Number} page 
     * @param {Array} genres 
     * @param {Array} keywords 
     * @param {Number} minRating - 0 to 10
     * @param {Number} minRuntime - in minutes
     * @param {Number} maxRuntime - in minutes
     */
    static async findMovies(page, genres, keywords, minRating, minRuntime, maxRuntime) {
        if (page == null) page = 1;

        let filter = {
            'page': page,
            'with_original_language': 'en',
            'include_adult': false,
            'include_video': false
        };

        if (genres != null) filter['with_genres'] = this.getGenreIDList(genres);
        if (keywords != null) filter['with_keywords'] = keywords;
        if (minRating != null) filter['vote_average.gte'] = minRating;
        if (minRuntime != null) filter['with_runtime.gte'] = minRuntime;
        if (maxRuntime != null) filter['with_runtime.lte'] = maxRuntime;

        let response = this.getRequest('discover/movie', filter);
        return response['results'];
    }

    /**
     * Returns a list of genre IDs based on a list of genre names.
     * @param {Array} names
     */
    static async getGenreIDList(names) {
        let genres = this.getGenres();
        let genreIDs = [];
        genres.forEach(entry => {
            if (names.includes(entry['name'])) {
                genreIDs.push(entry['id']);
            }
        });

        return genreIDs;
    }
}

export default MovieDBHandler;