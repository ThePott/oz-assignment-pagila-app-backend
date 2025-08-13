import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

export const prismaGetAllFilms = async () => await prisma.film.findMany()

export const prismaGetFilmPost = async (film_id: number) => await prisma.film_post.findFirst({ where: { film_id } })

export const prismaGetManyComments = async (film_id: number) => await prisma.film_comment.findMany({
    where: { film_post: { film_id } },
    select: { comment_id: true, customer_id: true, content: true, created_at: true, updated_at: true }
})

export const prismaCountLike = async (film_id: number) => await prisma.post_reaction.count({
    where: {
        reaction_type: 'LIKE',
        film_post: { film: { film_id } }
    }
})

export const prismaDoILikeIt = async (film_id: number, customer_id: number) => prisma.post_reaction.findFirst({ where: { customer_id } })

// export const prismaGetLikeCount = async(post

