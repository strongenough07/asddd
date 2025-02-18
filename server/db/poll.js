import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getPolls = async () => {    
    return await prisma.poll.findMany(
        {
            orderBy: {
                votes: 'asc'
            }
        }
    );
}

export const createPollVote = async (movie) => {
    return await prisma.poll.update({
        where: {
            id: movie.id
        },
        data: {
            votes: {
                increment: 1
            }
        }
    });
}