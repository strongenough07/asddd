import { getMovies }  from '~~/server/db/movies';

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const page = parseInt(query.page) || 1;
  const pageSize = 12;
  const skip = (page - 1) * pageSize;


  try {
    const totalPages = await getMovies(null, {
      
    });

    const movie = await getMovies(null, {
      orderBy: {
        id: 'desc',
      },
      skip: skip,
      take: pageSize,
      
    });
   
    return { movie , totalPages: Math.ceil(totalPages.length / pageSize) };
  } catch (error) {
    console.error(error);
    throw createError({ statusCode: 500, statusMessage: 'Could not get movies' });
  } 
});
