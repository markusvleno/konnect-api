const router = require("express").Router();
const CredentialModel = require("../model/credential");
const { userExist } = require("../utils/userExist");
const verify = require("../utils/verify");
const { updateCookie } = require("../utils/cookie");
const { validateUsernameRegex } = require("../utils/regex");

router.post("/", async (req, res) => {
    const { username, password } = req.body.data;

    if (!username || !password) return res.status(20).send({ code: 400, message: "Insufficient data" });

    if (!validateUsernameRegex(username)) {
        return res.status(200).send({ code: 406, message: "Not a valid data" });
    }

    if (await !userExist(username)) return res.status(200).send({ code: 406, message: "User not registered!" });

    const data = await CredentialModel.findOne({ username: username }, "pwHash pwSalt").exec();

    const validPassword = verify(password, data._doc.pwHash, data._doc.pwSalt);

    if (validPassword) {
        const token = await updateCookie(username);
        res.cookie("_token", token, { maxAge: 1000 * 60 * 60 * 24 * 30 }); //expire after 30days
        res.redirect("http://localhost:5000");
    } else {
        res.status(200).send({ code: 401, message: "Unauthorized " });
    }
});

router.get("/", (req, res) => {
    res.status(401).send({ message: "only post method is allowed" });
});

module.exports = router;
