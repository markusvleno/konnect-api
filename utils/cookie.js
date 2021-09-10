const UserModel = require("../model/users");

const validateCookie = async (_token) => {
    if (!_token || typeof _token !== "string") return false;

    const record = await UserModel.findOne({ loginToken: _token }).exec();
    if (!record) return false;

    const userToken = record._doc.loginToken;

    return userToken === _token ? true : false;
};

const updateCookie = async (username, token) => {
    await UserModel.updateOne({ username: username }, { loginToken: token });
};

module.exports = { validateCookie, updateCookie };
