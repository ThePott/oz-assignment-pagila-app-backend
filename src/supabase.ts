import { film_comment, post_reaction, PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

export const prismaGetAllFilms = async () => await prisma.film.findMany()

export const prismaGetFilmPost = async (film_id: number) => await prisma.film_post.findFirst({ where: { film_id } })

export const prismaGetManyComments = async (film_id: number) => await prisma.film_comment.findMany({
    where: { film_post: { film_id } },
    select: { comment_id: true, customer_id: true, content: true, created_at: true, updated_at: true },
    orderBy: { created_at: 'desc' }
})

export const prismaCountLike = async (film_id: number) => await prisma.post_reaction.count({
    where: {
        reaction_type: 'LIKE',
        film_post: { film: { film_id } }
    }
})

export const prismaDoILikeIt = async (film_id: number, customer_id: number) => prisma.post_reaction.findFirst({
    where: {
        customer_id,
        film_post: { film_id }
    }
})

export const prismaCreateComment = async (film_comment: film_comment) => prisma.film_comment.create({ data: film_comment })

export const prismaLike = async (post_reaction: post_reaction) => {
    return prisma.post_reaction.upsert({
        where: {
            post_id_customer_id: {
                post_id: post_reaction.post_id,
                customer_id: post_reaction.customer_id
            }
        },
        update: {
            reaction_type: post_reaction.reaction_type
        },
        create: post_reaction
    })
}

export const prismaDislike = async (post_id: number, customer_id: number) => prisma.post_reaction.delete({
    where: {
        post_id_customer_id: {
            post_id,
            customer_id
        }
    }
})

export const prismaDeleteComment = async (comment_id: number) => prisma.film_comment.delete({ where: { comment_id } })

export const prismaPutComment = async (film_comment: film_comment) => prisma.film_comment.update({
    where: { comment_id: film_comment.comment_id },
    data: film_comment
})