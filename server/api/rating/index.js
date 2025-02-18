import {updateMovieSubRating, updateMovieRating, updateSerialRating, getMovieRating, getSerialRating, updateSerialSubRating, getSerialSubRating } from '../../db/rating';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { slug, type, rating } = await readBody(event);

    try {
        let movie = null;
        let serial = null;
        try {
            movie = await prisma.movie.findUnique({ where: { slug } });
        }
        catch (e) {
        }
        try {
            serial = await prisma.serial.findUnique({ where: { slug } });
        }
        catch (e) {
        }


        if (type === 'movie' && movie) {

            await updateMovieRating(slug, rating);
            const { ratingmovie } = await getMovieRating(slug);
            const sum = ratingmovie.reduce((acc, curr) => acc + Number(curr), 0);
            const averageRating = ratingmovie.length > 0 ? sum / ratingmovie.length : 0;
            return { averageRating };

        } else if (type === 'subtitle' && movie) {
            await updateMovieSubRating(slug, rating); // Assuming you rename updateMovieSubRating to updateMovieRating
            const { ratingsubs } = await getMovieRating(slug);
            const sum = ratingsubs.reduce((acc, curr) => acc + Number(curr), 0);
            const averageRating = ratingsubs.length > 0 ? sum / ratingsubs.length : 0;
            return { averageRating };
        }
        else if (type === 'movie' && serial) {
            await updateSerialRating(slug, rating)
            const { ratingserial } = await getSerialRating(slug)
            const sum = ratingserial.reduce((acc, curr) => acc + Number(curr), 0);
            const averageRating = ratingserial.length > 0 ? sum / ratingserial.length : 0;
            return {
                averageRating
            }

        }
        else if (type === 'subtitle' && serial) {
            await updateSerialSubRating(slug, rating)
            const { ratingsubs } = await getSerialSubRating(slug)
            const sum = ratingsubs.reduce((acc, curr) => acc + Number(curr), 0);
            const averageRating = ratingsubs.length > 0 ? sum / ratingsubs.length : 0;
            return {
                averageRating
            }
        }
        else {
            throw createError({ statusCode: 400, statusMessage: 'Invalid type or slug' });
        }
    } catch (error) {
        console.error("Error updating rating:", error);
        throw createError({ statusCode: 500, statusMessage: 'Could not update rating' });
    }
});
