const router = require("express").Router();
const hasUser = require("../utils/hasUser");
const verify = require("../utils/verify");

router.get("/", async (req, res) => {
    const { username, password } = req.body;

    let user = await hasUser(username);

    if (!user) {
        res.status(603).send({ message: "not registerd" });
    } else {
        const verified = await verify(username, password);
        verified
            ? res.status(604).send({ message: "login success" })
            : res.status(605).send({ message: "login failed" });
    }
});

module.exports = router;
