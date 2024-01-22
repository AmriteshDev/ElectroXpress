const app = require("./app");

const dotenv = require("dotenv");
const connectDatabse = require("./databse");


// Handling Uncaught Exception 
// console.log(amritesh)
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1)

})


// Config

dotenv.config({ path: "backend/config/config.env" });

// Connecting to database
connectDatabse();





const server = app.listen(process.env.PORT, () => {
    console.log(`Severe is working on http://localhost:${process.env.PORT}`);
})




// Unhandled Promise Rejection  -- worng url/ worng .env url
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandle Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });

});