const CredentialModel = require("../model/credential");

const userExist = (username) => {
    if (!username) return true;

    let exist = true;

    try {
        exist = CredentialModel.findOne({ username: username }, (error, result) => {
            if (error) return true;

            return result !== null ? true : false;
        });
    } catch (error) {
        console.log(error);
    }

    return exist;
};

module.exports = { userExist };
