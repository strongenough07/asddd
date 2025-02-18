import { searchMovies } from '../../db/movies';
import { searchSerials } from '../../db/serials';

export default defineEventHandler(async (event) => {
    const query = getQuery(event).query;
    if (!query) {
        return {
            results: []
        };
    }
    const movieResults = await searchMovies(query);
    const serialResults = await searchSerials(query);
    const results = [...movieResults, ...serialResults];
    return { results };
});
