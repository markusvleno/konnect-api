const router = require("express").Router();
const { validateCookie } = require("../utils/cookie");

router.get("/", async (req, res) => {
    if (validateCookie(req.cookies.sessionID)) res.status(200).send({ msg: "good" });
    else res.status(401).send({ msg: "not good" });
});

module.exports = router;
