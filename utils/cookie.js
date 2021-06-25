const { generateToken } = require("../utils/hash");
const UserModel = require("../model/users");

const validateCookie = async (_token) => {
    if (!_token) return false;
    const record = await UserModel.findOne({ loginToken: _token }).exec();
    if (!record) return false;

    const userToken = record._doc.loginToken;

    return userToken === _token ? true : false;
};

const updateCookie = async (username) => {
    const token = generateToken();
    await UserModel.updateOne({ username: username }, { loginToken: token });
    return token;
};

module.exports = { validateCookie, updateCookie };
