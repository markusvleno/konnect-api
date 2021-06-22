const router = require("express").Router();
const UserModel = require("../model/users");
const hasUser = require("../utils/userExist");
const verify = require("../utils/verify");
const { updateCookie } = require("../utils/cookie");
const { validateUsernameRegex } = require("../utils/regex");

router.post("/", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) return res.status(200).send({ code: 400, message: "Insufficient data" });

    if (!validateUsernameRegex(username)) {
        return res.status(200).send({ code: 406, message: "Not a valid data" });
    }

    if (await hasUser(username)) return res.status(200).send({ code: 406, message: "User not registered!" });

    const validPassword = verify(username, password);

    if (validPassword) {
        const token = updateCookie(username);
        res.cookie("_token", token, { maxAge: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) }); //expire after 30days
        res.status(200).send({ code: 701, message: "Login Successfull" });
    } else {
        res.status(200).send({ code: 401, message: "Unauthorized " });
    }
});

router.get("/", (req, res) => {
    res.status(200).send({ code: 700, message: "ok" });
});

module.exports = router;
