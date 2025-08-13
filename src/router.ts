import express from "express"
import { logError } from "./errorHandler"
import { prismaGetAllFilms, prismaGetManyComments, prismaGetFilmPost, prismaCountLike, prismaDoILikeIt, prismaCreateComment } from "./supabase"

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
        console.log({filmComment})
        const result = await prismaCreateComment(filmComment)
        res.status(200).json(result)
    } catch (error) {
        logError(error)
    }
})
router.post("/film-post/:filmPostId/like/customer/:customerId", async (req, res) => {
    try {
        res.status(200).send("---- so far so good")
    } catch (error) {
        logError(error)
    }
})

export default router