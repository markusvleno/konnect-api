const mongoose = require("mongoose");
const UserModel = require("../model/users");
const CredentialModel = require("../model/credential");
const { hash, generateSecret } = require("./hash");

const createUser = async (username, password, email, name) => {
    let user = new UserModel({
        _id: new mongoose.Types.ObjectId(),
        username: username,
        name: name,
        accountCreated: new Date().toString(),
        loginToken: "no token",
    });

    user.save((error, newUser) => {
        if (error) throw "Registration failed! try again.";

        const secret = generateSecret();

        const cred = new CredentialModel({
            _id: new mongoose.Types.ObjectId(),
            username: username,
            email: email,
            pwSalt: secret,
            pwHash: hash(password, secret),
            userID: newUser._id,
        });
        cred.save((error, newCred) => {
            if (error) throw "Registration failed! try again.";
        });
    });
};

module.exports = createUser;
