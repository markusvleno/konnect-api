const router = require("express").Router();
const UserModel = require("../model/users");
const hasUser = require("../utils/hasUser");
const verify = require("../utils/verify");
const { authenticate } = require("../utils/auth");
const { updateCookie } = require("../utils/cookie");

router.post("/", async (req, res) => {
    const { username, password } = req.body;

    let user = await hasUser(username);

    if (!user) {
        res.status(603).send({ message: "not registerd" });
    } else {
        const verified = await verify(username, password);
        if (verified) {
            const token = updateCookie(username);
            res.cookie("_token", token, { expire: new Date(Date.now() + 1000 * 60) });
            res.redirect("/protected");
        } else {
            res.status(605).send({ message: "login failed" });
        }
    }
});

router.get("/", authenticate, (req, res) => {
    res.status(200).send({ message: "ok" });
});

module.exports = router;
