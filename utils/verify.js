const CredentialModel = require("../model/credential");
const hash = require("./hash");

const verify = async (username, password) => {
    const data = await CredentialModel.findOne({ username: username }, "pwSalt pwHash", (result) => result);

    return hash(password, data.pwSalt) === data.pwHash ? true : false;
};

module.exports = verify;
