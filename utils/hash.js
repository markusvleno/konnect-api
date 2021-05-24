const { createHmac } = require("crypto");

function hash(password, salt) {
    return createHmac("sha256", salt).update(password).digest("hex");
}

module.exports = { hash };
