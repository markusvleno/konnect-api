const router = require("express").Router();
const createUser = require("../utils/createuser");
const { userExist } = require("../utils/userExist");

const { validateEmailRegex, validateUsernameRegex } = require("../utils/regex");

//entry
router.post("/", async (req, res) => {
    const { username, password, email, name } = req.body.data;

    if (!username || !password || !email || !name) {
        return res.status(200).send({ code: 400, message: "Insufficient data" });
    }

    if (!validateEmailRegex(email) || !validateUsernameRegex(username)) {
        return res.status(200).send({ code: 406, message: "Not a valid data" });
    }

    if (await userExist(username)) {
        return res.status(200).send({ code: 406, message: "Already registerd" });
    } else {
        try {
            await createUser(username, password, email, name);
        } catch (error) {
            return res.status(200).send({ code: 502, message: error });
        }
        return res.status(200).send({ code: 200, message: "Registerd" });
    }
});

router.get("/", (req, res) => {
    res.status(401).send({ message: "only post method is allowed" });
});

module.exports = router;
