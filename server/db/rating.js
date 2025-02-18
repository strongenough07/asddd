import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const updateMovieRating = async (slug, rating) => {
    return await prisma.movie.update({
        where: {
            slug: slug
        },
        data: {
            ratingmovie: {
                push: String(rating)
            }
        }
    })
}
export const updateMovieSubRating = async (slug, rating) => {
    return await prisma.movie.update({
        where: {
            slug: slug
        },
        data: {
            ratingsubs: {
                push: String(rating)
            }
        }
    })
}

export const getMovieRating = async (slug) => {
    return await prisma.movie.findUnique({
        where: {
            slug: slug
        },
        select: {
            ratingmovie: true,
            ratingsubs: true
        }
    })
}

export const updateSerialRating = async (slug, rating) => {
    return await prisma.serial.update({
        where: {
            slug: slug
        },
        data: {
            ratingserial: {
                push: String(rating)
            }
        }
    })
}

export const getSerialRating = async (slug) => {
    return await prisma.serial.findUnique({
        where: {
            slug: slug
        },
        select: {
            ratingserial: true,
            ratingsubs: true
        }
    })
}

export const updateSerialSubRating = async (slug, rating) => {    
    return await prisma.serial.update({
        where: {
            slug: slug
        },
        data: {
            ratingsubs: {
                push: String(rating)
            }
        }
    })
}

export const getSerialSubRating = async (slug) => {
    return await prisma.serial.findUnique({
        where: {
            slug: slug
        },
        select: {
            ratingsubs: true
        }
    })
}
