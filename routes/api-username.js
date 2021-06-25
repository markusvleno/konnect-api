const router = require("express").Router();
const { userExist } = require("../utils/userExist");
const { validateUsernameRegex } = require("../utils/regex");

router.get("/", async (req, res) => {
    const { username } = req.body;

    if (!username) return res.status(400).send({ code: 400, message: "Insufficient data" });

    if (!validateUsernameRegex(username)) {
        return res.status(406).send({ code: 406, message: "Not a valid data" });
    }

    if (await userExist(username)) {
        res.status(200).send({ available: false, message: "username is taken" });
    } else {
        res.status(200).send({ available: true, message: "username is not taken" });
    }
});

router.post("/", (req, res) => {
    res.status(401).send({ message: "only get mothod is allowed" });
});

module.exports = router;
