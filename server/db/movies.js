import { prisma } from '.'

export const getMovies = (postId, params = {}) => {
    return prisma.movie.findMany({
      ...params,
      // where: {
      //   ...params.where,
      //   id: postId,
      // },
    })
  }

  export const getMovie = (slug, params = {}) => {  
    return prisma.movie.findUnique({
      ...params,
      where: {
        ...params.where,
        slug: slug,
      },
    })
  }

  export const searchMovies = (query, params = {}) => {
    return prisma.movie.findMany({
      ...params,
      where: {
        ...params.where,
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
    })
  }