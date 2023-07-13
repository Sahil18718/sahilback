const mongoose = require("mongoose")
// require("dotenv").config();

const connection = mongoose.connect("mongodb+srv://sahil:sahilmalviya@cluster0.hhowf26.mongodb.net/final?retryWrites=true&w=majority")

module.exports={
    connection
}