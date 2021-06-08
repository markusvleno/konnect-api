const router = require("express").Router();
const hasUser = require("../utils/hasUser");
const verify = require("../utils/verify");
const { generateCookie, saveCookie } = require("../utils/cookie");

router.get("/", async (req, res) => {
    const { username, password } = req.body;

    let user = await hasUser(username);

    if (!user) {
        res.status(603).send({ message: "not registerd" });
    } else {
        const verified = await verify(username, password);
        const cookie = generateCookie();
        if (verified) {
            res.cookie("sessionID", cookie, { maxAge: 24 * 60 * 1000, httpOnly: true });
            saveCookie(username, cookie, new Date().getTime());
            res.status(200).send({ message: "login success" });
        } else {
            res.status(605).send({ message: "login failed" });
        }
    }
});

module.exports = router;
