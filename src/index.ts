import express from "express"
import cors from "cors"
import router from "./router"

const app = express()
app.use(express.json())
app.use(express.text())

const corsOptions: cors.CorsOptions = {
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["OPTIONS", "GET", "POST", "DELETE", "PUT"]
}
app.use(cors(corsOptions))
app.use("/film", router)
app.use("/", (req, res) => res.send("---- welcome"))


const PORT = process.env.PORT || 3939
app.listen(PORT, () => console.log("---- server is on port:", PORT))
