const app = require("./app");

const dotenv = require("dotenv");
const connectDatabse = require("./databse");



// Config

dotenv.config({ path: "backend/config/config.env" });

// Connecting to database
connectDatabse();





app.listen(process.env.PORT, () => {
    console.log(`Severe is working on http://localhost:${process.env.PORT}`);
})