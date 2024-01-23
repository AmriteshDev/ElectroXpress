const mongoose = require("mongoose");
const validator = require("validator");

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLenght: [30, "Name cannot asceed 30 characters"],
        minLenght: [4, "Name should have more that 4 characters"],

    },
    email: {
        type: String,
        required: [true, "Please Enter your Email"],
        uniqe: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLenght: [8, "Password should be greater than 8 characters"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})