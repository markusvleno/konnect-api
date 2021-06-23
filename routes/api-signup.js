const router = require("express").Router();
const createUser = require("../utils/createuser");
const { userExist } = require("../utils/userExist");

const { validateEmailRegex, validateUsernameRegex } = require("../utils/regex");

//entry
router.post("/", async (req, res) => {
    const { username, password, email, name, profilePicture } = req.body;

    if (!username || !password || !email || !name || !profilePicture) {
        return res.status(400).send({ message: "Insufficient data" });
    }

    if (!validateEmailRegex(email) || !validateUsernameRegex(username)) {
        return res.status(406).send({ message: "Not a valid data" });
    }

    if (await userExist(username)) {
        return res.status(406).send({ message: "Already registerd" });
    } else {
        try {
            await createUser(username, password, email, name, profilePicture);
        } catch (error) {
            return res.status(502).send({ message: error });
        }
        return res.status(200).send({ message: "Registerd" });
    }
});

router.get("/", (req, res) => {
    res.status(401).send({ message: "only post method is allowed" });
});

module.exports = router;
