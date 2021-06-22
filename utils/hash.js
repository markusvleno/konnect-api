const { createHmac, randomBytes } = require("crypto");

const hash = (password, salt) => {
    return createHmac("sha256", salt).update(password).digest("hex");
};

const generateToken = () => {
    return randomBytes(64).toString("hex");
};

const generateSecret = () => {
    return randomBytes(64).toString("utf8");
};

module.exports = { hash, generateToken, generateSecret };
