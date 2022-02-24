import app from "./server.js" 
import mongodb from "mongodb"
import dotenv from "dotenv"
import lol_tracker from "./api/lol_tracker.route.js"
import Summoners from "./models/summonerSchema.js"

dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000


app.use("/api/v1/lol_tracker", lol_tracker)


const API_KEY = "RGAPI-30c0e749-44a0-46b9-b8f4-5108697bee46";

MongoClient.connect(
    process.env.TRACKER_DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
    }
).catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    app.listen(port, () => {
        console.log('listening on port ' +port)
    })

    // get summoner info 
    app.get('/summonerGet', (req, res) => {
        const dbo = client.db("lol-tracker")
        
        res.send("yo mama")
    })
    
    // make the endpoint here for 
    app.post('/summonerUpdate', (req, res) => {
        const dbo = client.db("lol-tracker")
        dbo.collection("summoners").insertOne({
            id : req.body.id,
            name : req.body.name
        })
        res.send("posted")
    })
    
})