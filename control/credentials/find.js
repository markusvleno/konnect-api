const mongoose = require("mongoose");
const CredentialModel = require("../../model/credential");

function find(username) {
    CredentialModel.findOne({ username: username }, (error, data) => {
        if (err) {
            return { code: 502, message: err };
        }
        return data;
    });
}

function findAll() {
    CredentialModel.find({})
        .then((result) => result)
        .catch((error) => console.log(error));
}

module.exports = { find, findAll };
