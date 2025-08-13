import express from "express"
import { logError } from "./errorHandler"
import { prismaGetAllFilms, prismaGetManyComments, prismaGetFilmPost, prismaCountLike, prismaDoILikeIt, prismaCreateComment, prismaDislike, prismaLike, prismaDeleteComment, prismaPutComment } from "./supabase"
import { post_reaction } from "../generated/prisma"

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const result = await prismaGetAllFilms()
        res.status(200).json(result)
    } catch (error) {
        logError(error)
    }
})
router.get("/:filmId/film-post/customer/:customerId", async (req, res) => {
    try {
        const filmIdString = req.params.filmId
        const customerIdString = req.params.customerId
        const film_id = Number(filmIdString)
        const customer_id = Number(customerIdString)
        const promiseArray = [] as Promise<any>[]

        promiseArray.push(prismaGetFilmPost(film_id))
        promiseArray.push(prismaGetManyComments(film_id))
        promiseArray.push(prismaCountLike(film_id))
        promiseArray.push(prismaDoILikeIt(film_id, customer_id))


        const postCommentCountIlikeArray = await Promise.all(promiseArray)

        res.status(200).json(postCommentCountIlikeArray)
    } catch (error) {
        logError(error)
    }
})
router.post("/film-post/:filmPostId/comment", async (req, res) => {
    try {
        const filmComment = req.body
        const result = await prismaCreateComment(filmComment)
        res.status(200).json(result)
    } catch (error) {
        logError(error)
    }
})
router.post("/film-post/:filmPostId/like/customer/:customerId", async (req, res) => {
    try {
        const filmPostIdString = req.params.filmPostId
        const customerIdString = req.params.customerId

        const film_post_id = Number(filmPostIdString)
        const customer_id = Number(customerIdString)

        const { doLike } = req.body
        console.log({ doLike })
        if (!doLike) {
            const result = await prismaDislike(film_post_id, customer_id)
            res.status(200).json(result)
            return
        }

        const post_reaction = {
            customer_id,
            post_id: film_post_id,
            reaction_type: "LIKE"
        } as post_reaction

        const result = await prismaLike(post_reaction)
        res.status(200).json(result)
    } catch (error) {
        logError(error)
    }
})
router.delete("/film-post/comment/:commentId", async (req, res) => {
    try {
        const commentIdString = req.params.commentId
        const comment_id = Number(commentIdString)
        const result = await prismaDeleteComment(comment_id)

        res.status(200).json(result)
    } catch (error) {
        logError(error)
    }
})
router.put("/film-post/comment/:commentId", async (req, res) => {
    try {
        const filmComment = req.body
        console.log({filmComment})
        const result = await prismaPutComment(filmComment)
        res.status(200).json(result)
    } catch (error) {
        logError(error)
    }
})

export default router