const ErrorHandler = require("../utils/errorHandler");


module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Worng Mongodb id error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid:${err.path} ${err.message} ${err.name} ${err.stack}`;
        err = new ErrorHandler(message, 400);
    }

    // Mongoose duplicate key error

    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

    // Worng JWT  token invalid error

    if (err.name === "jsonWebTokenError") {
        const message = `Json web token is invalid, try again`;
        err = new ErrorHandler(message, 400);
    }
    // Worng JWT Expire error

    if (err.name === "TokenExpireError") {
        const message = `Json web token is Expired, try again`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        error: err.message,
    })
}