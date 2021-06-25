const mongoose = require("mongoose");
const UserModel = require("../model/users");
const CredentialModel = require("../model/credential");
const { hash, generateSecret } = require("./hash");

const createUser = async (username, password, email, name, profilePicture) => {
    CredentialModel.watch().on("change", (data) => {
        console.log(data);
    });

    let user = new UserModel({
        _id: new mongoose.Types.ObjectId(),
        username: username,
        name: { firstName: name.firstName || "First name not found", lastName: name.lastName || "Last name not found" },
        accountCreated: new Date().toString(),
        profilePicture: profilePicture,
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
