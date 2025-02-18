import { prisma } from '.'

export const getSerial = (slug, params = {}) => {
  return prisma.serial.findUnique({
    ...params,
    where: {
      ...params.where,
      slug: slug,
    },
  })
}




export const getSerials = (postId, params = {}) => {
    return prisma.serial.findMany({
      ...params,
      // where: {
      //   ...params.where,
      //   id: postId,
      // },
    })
  }

  export const searchSerials = (query, params = {}) => {
    return prisma.serial.findMany({
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