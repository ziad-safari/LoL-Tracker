import express from "express" 
import cors from "cors" 
import lol_tracker from "./api/lol_tracker.route.js"
import Summoners from "./models/summonerSchema.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/lol_tracker", lol_tracker)
app.use("*", (req,res) => res.status(404).json({error: "not found bro"}))
app.get('/', (req, res) => {
    res.send("hello world")
})





export default app