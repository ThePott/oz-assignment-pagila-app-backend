import express from "express"
import cors from "cors"

const app = express()

const PORT = process.env.PORT || 3939
app.listen(PORT, () => console.log("---- server is on port:", PORT))
