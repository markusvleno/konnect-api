const CredentialModel = require("../model/credential");

const hasUser = async (username) => {
    if (!username) return false;

    let user = await CredentialModel.findOne({ username: username }, (error, result) => {
        if (error) return { error: true, message: error };
        return result;
    });

    return user ? true : false;
};

module.exports = hasUser;
