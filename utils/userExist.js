const CredentialModel = require("../model/credential");

const userExist = async (username) => {
    if (!username) return false;

    let exist;

    try {
        exist = await CredentialModel.findOne({ username: username }).exec();
    } catch (error) {
        console.log(error);
    }

    return exist ? true : false;
};

module.exports = { userExist };
