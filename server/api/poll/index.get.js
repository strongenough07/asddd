import { getPolls } from '~/server/db/poll';

export default defineEventHandler(async (event) => {
    try {
        const polls = await getPolls();
        return {
            statusCode: 200,
            body: polls,
        };
    } catch (error) {
        console.error("Error fetching polls:", error);
        return {
            statusCode: 500,
            body: { message: "Failed to fetch polls" },
        };
    }
});
