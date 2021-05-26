const mongoose = require("mongoose");
const UserModel = require("../model/users");
const CredentialModel = require("../model/credential");
const { hash } = require("./hash");

const createUser = (data) => {
    const { username, email, password, name, profilePicture } = data;
    let newUser = new UserModel({
        _id: mongoose.Types.ObjectId(),
        name: { firstName: name.firstName, lastName: name.lastName },
        accountCreated: new Date().toString(),
        profilePicture: profilePicture,
    }).save();

    CredentialModel({
        _id: mongoose.Types.ObjectId(),
        username: username,
        email: email,
        pwSalt: "abc123",
        pwHash: hash(password, "abc123"),
        userID: newUser._id,
    }).save();
};

module.exports = createUser;
