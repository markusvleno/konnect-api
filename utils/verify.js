const { hash } = require("./hash");

const verify = (password, pwHash, pwSalt) => {
    return hash(password, pwSalt) === pwHash ? true : false;
};

module.exports = verify;
