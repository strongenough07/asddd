import { getMovie }  from '~~/server/db/movies';

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    try {
      const movie = await getMovie(query.slug);
      
      return { movie };
    } catch (error) {
      console.error(error);
      throw createError({ statusCode: 500, statusMessage: 'Could not get movie' });
    } 
  });