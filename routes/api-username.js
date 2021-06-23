const router = require("express").Router();
const { userExist } = require("../utils/userExist");

router.get("/", async (req, res) => {
    const { username } = req.body;

    if (!username) return res.status(400).send({ code: 400, message: "Insufficient data" });

    if (!validateUsernameRegex(username)) {
        return res.status(406).send({ code: 406, message: "Not a valid data" });
    }

    if (userExist(username)) {
        res.status(406).send({ available: false, message: "username is taken" });
    } else {
        res.status(200).send({ available: true, message: "username is not taken" });
    }
});

module.exports = router;
