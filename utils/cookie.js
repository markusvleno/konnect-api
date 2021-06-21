const { generateToken } = require("../utils/hash");
const UserModel = require("../model/users");

const validateCookie = async (_token) => {
    if (!_token) return false;
    const valid = await UserModel.findOne({ loginToken: req.cookie._token }, ({ loginToken }) => {
        if (loginToken === req.cookie._token) return true;
        else return false;
    });

    return valid;
};

const updateCookie = async (username) => {
    const token = generateToken();
    await UserModel.updateOne({ username: username }, { loginToken: token });
    return token;
};

module.exports = { validateCookie, updateCookie };
