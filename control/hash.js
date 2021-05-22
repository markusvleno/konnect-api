const { createHmac } = require("crypto");

function hash(key, salt) {
    return createHmac("sha256", salt).update(key).digest("hex");
}

module.exports = { hash };
