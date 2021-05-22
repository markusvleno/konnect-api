const mongoose = require("mongoose");
const CredentialModel = require("../../model/credential");

function insert(credential) {
    const data = new CredentialModel(credential);

    data.save()
        .then((result) => console.log("data inserted"))
        .catch((error) => console.log(error));
}

module.exports = { insert };
