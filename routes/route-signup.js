const router = require("express").Router();
const createUser = require("../utils/createuser");
const hasuser = require("../utils/hasUser");
//entry
router.post("/", async (req, res) => {
    if (await hasuser(req.body.username)) {
        return res.status(601).send({ message: "already registerd" });
    } else {
        createUser(req.body);
        res.status(200).send({ message: "registerd" });
    }
});

router.get("/", (req, res) => {
    res.status(200).send({ message: "all ok" });
});

module.exports = router;
