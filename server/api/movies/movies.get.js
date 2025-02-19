import { getMovies }  from '~~/server/db/movies';

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const page = parseInt(query.page) || 1;
  const pageSize = 12;
  const skip = (page - 1) * pageSize;


  try {
    const movieNum = await getMovies(null, {
      
      
    });
    const totalPages = Math.ceil(movieNum.length / pageSize
    );

    const movie = await getMovies(null, {
      orderBy: {
        id: 'desc',
      },
      skip: skip,
      take: pageSize,
      
    });
    return { movie, totalPages };
  } catch (error) {
    console.error(error);
    throw createError({ statusCode: 500, statusMessage: 'Could not get movies' });
  } 
});
