const router = require("express").Router();
const CredentialModel = require("../model/credential");
const { userExist } = require("../utils/userExist");
const verify = require("../utils/verify");
const { updateCookie } = require("../utils/cookie");
const { validateUsernameRegex } = require("../utils/regex");

router.post("/", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).send({ message: "Insufficient data" });

    if (!validateUsernameRegex(username)) {
        return res.status(406).send({ message: "Not a valid data" });
    }

    if (!userExist(username)) return res.status(406).send({ message: "User not registered!" });

    const data = CredentialModel.findOne({ username: username }, "pwHash pwSalt", (error, result) => {
        if (error) return res.status(502).send({ message: error });

        return result;
    });

    console.log(data);

    const validPassword = verify(password, data.pwHash, data.pwSalt);

    if (validPassword) {
        const token = updateCookie(username);
        res.cookie("_token", token, { maxAge: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) }); //expire after 30days
        res.status(200).send({ message: "Login Successfull" });
    } else {
        res.status(401).send({ message: "Unauthorized " });
    }
});

router.get("/", (req, res) => {
    res.status(401).send({ message: "only post method is allowed" });
});

module.exports = router;
