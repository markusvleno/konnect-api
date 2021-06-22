const mongoose = require("mongoose");
const UserModel = require("../model/users");
const CredentialModel = require("../model/credential");
const { hash, generateSecret } = require("./hash");

const createUser = (data) => {
    const { username, email, password, name, profilePicture } = data;
    let newUser = new UserModel({
        _id: mongoose.Types.ObjectId(),
        username: username,
        name: { firstName: name.firstName, lastName: name.lastName },
        accountCreated: new Date().toString(),
        profilePicture: profilePicture,
        loginToken: null,
    }).save();

    const secret = generateSecret();

    CredentialModel({
        _id: mongoose.Types.ObjectId(),
        username: username,
        email: email,
        pwSalt: secret,
        pwHash: hash(password, secret),
        userID: newUser._id,
    }).save();
};

module.exports = createUser;
