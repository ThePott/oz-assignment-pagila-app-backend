import express from "express"
import { logError } from "./errorHandler"
import { prismaGetAllFilms } from "./supabase"

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const result = await prismaGetAllFilms()
        console.log({result})
        res.status(200).json(result)
    } catch (error) {
        logError(error)
    }
})
router.get("/:filmId", async (req, res) => {
    try {
        res.status(200).send("---- so far so good")
    } catch (error) {
        logError(error)
    }
})
router.get("/film-post/:filmPostId", async (req, res) => {
    try {
        res.status(200).send("---- so far so good")
    } catch (error) {
        logError(error)
    }
})
router.get("/film-post/:filmPostId/comment", async (req, res) => {
    try {
        res.status(200).send("---- so far so good")
    } catch (error) {
        logError(error)
    }
})
router.post("/film-post/:filmPostId/comment", async (req, res) => {
    try {
        res.status(200).send("---- so far so good")
    } catch (error) {
        logError(error)
    }
})
router.get("/film-post/:filmPostId/like", async (req, res) => {
    try {
        res.status(200).send("---- so far so good")
    } catch (error) {
        logError(error)
    }
})
router.get("/film-post/:filmPostId/like/customer/:customerId", async (req, res) => {
    try {
        res.status(200).send("---- so far so good")
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