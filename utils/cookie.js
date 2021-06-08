const mongoose = require("mongoose");
const cookieModel = require("../model/cookie");
const crs = require("crypto-random-string");

const saveCookie = (username, cookie, age) => {
    const newCookie = new cookieModel({
        _id: mongoose.Types.ObjectId(),
        user: username,
        cookieValue: cookie,
        cookieExp: age,
    }).save();
};
const generateCookie = () => {
    return crs(64);
};
const validateCookie = async (cookie) => {
    let valid = await cookieModel.findOne({ cookieValue: cookie }, (result) => result);

    return valid ? true : false;
};

module.exports = { saveCookie, generateCookie, validateCookie };
