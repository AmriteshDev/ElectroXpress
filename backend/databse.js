const mongoose = require("mongoose");



const connectDatabse = () => {
    mongoose.connect(process.env.DB_URI).then((data) => {
        console.log(`Mongodb connected with server:${data.connection.host}:${process.env.DB_URI}`)
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = connectDatabse;
