import { getMovieRating, getSerialRating } from '../../db/rating';

export default defineEventHandler(async (event) => {
    const { slug } = getQuery(event);
    
    try {
        const movieRatingData = await getMovieRating(slug) || {};
        const serialRatingData = await getSerialRating(slug) || {};

      

        let ratingmovie = [];
        let ratingsubs = [];
        let ratingserial = [];

        if (movieRatingData.ratingmovie || movieRatingData.ratingsubs) {
            ratingmovie = Array.isArray(movieRatingData.ratingmovie) ? movieRatingData.ratingmovie.map(Number) : [];
            ratingsubs = Array.isArray(movieRatingData.ratingsubs) ? movieRatingData.ratingsubs.map(Number) : [];
        } else if (serialRatingData.ratingserial || serialRatingData.ratingsubs) {
            ratingserial = Array.isArray(serialRatingData.ratingserial) ? serialRatingData.ratingserial.map(Number) : [];
            ratingsubs = Array.isArray(serialRatingData.ratingsubs) ? serialRatingData.ratingsubs.map(Number) : [];
        }

        // Функция за изчисляване на среден рейтинг
        const calculateAverage = (ratings) => {
            if (!ratings.length) return 0;
            return parseFloat((ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length).toFixed(2));
        };

        const averageMovieRating = calculateAverage(ratingmovie);
        const averageSubsRating = calculateAverage(ratingsubs);
        const averageSerialRating = calculateAverage(ratingserial);

      

        return {
            rating: averageMovieRating > 0 ? averageMovieRating : averageSerialRating,
            subsRating: averageSubsRating
        };

    } catch (error) {
        console.error(`Error getting rating:`, error);
        throw createError({ statusCode: 500, statusMessage: `Could not get rating` });
    }
});
