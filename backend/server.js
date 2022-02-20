import express from "express" 
import cors from "cors" 
import lol_tracker from "./api/lol_tracker.route.js"


const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/lol_tracker", lol_tracker)
app.use("*", (req,res) => res.status(404).json({error: "not found}"}))

export default app