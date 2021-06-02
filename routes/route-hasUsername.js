const router = require("express").Router();
const hasUser = require("../utils/hasUser");

router.get("/", async (req, res) => {
    let response = await hasUser(req.query.username);

    if (response) {
        res.status(200).send({ available: false, message: "username is taken" });
    } else {
        res.status(200).send({ available: true, message: "username is not taken" });
    }
});

module.exports = router;
