import { createPollVote } from '~/server/db/poll';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { movie } = body;

    if (!movie) {
        return {
            statusCode: 400,
            body: { message: 'Movie selection is required.' },
        };
    }

    try {
        const pollVote = await createPollVote(movie);
        return {
            statusCode: 200,
            body: pollVote,
        };
    } catch (error) {
        console.error('Error creating poll vote:', error);
        return {
            statusCode: 500,
            body: { message: 'Failed to create poll vote.' },
        };
    }
});

