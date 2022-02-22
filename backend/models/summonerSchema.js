import mongoose from "mongoose"


// summoner schema for document structure 
const summonerSchema = new mongoose.Schema({
    id : {
        type : String,
        required : true,
        unique : true
    },
    name : { 
        type : String,
        required : true,
        unique : true,
    },
    level : { 
        type : Number,
        required : true
    },
    tier : {
        type : Number,
        required : true
    },
    rank : {
        type : Number,
        required : true
    },
    totalGames : {
        type : Number,
        required : true
    },
    wins : {
        type : Number,
        required : true
    },
    losses : {
        type : Number, 
        required : true
    },
    updateDate : {
        type : String,
        required : true
    }

})

const Summoners = new mongoose.model("SUMMONER", summonerSchema)

export default Summoners
