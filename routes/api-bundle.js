const router = require("express").Router();
const UserModel = require("../model/users");
const { validateUsernameRegex } = require("../utils/regex");
const { validateCookie } = require("../utils/cookie");
const { userExist } = require("../utils/userExist");
const { isNotLoggedIN } = require("../utils/authentication");

router.get("/", async (req, res) => {
    const { id } = req.query;

    if (!id) return res.status(200).send({ code: 400, message: "Insufficient data" });

    try {
        UserModel.findById(id, (err, docs) => {
            if (err) {
                res.status(200).send({ code: 502, message: "database error" + err });
                return;
            }
            if (!docs) res.status(200).send({ code: 404, message: "record not found!" });
            else res.status(200).send({ code: 200, message: "user bundle", bundle: docs.bundle || null });
        });
    } catch (error) {
        res.status(200).send({ code: 502, message: "server error" });
    }
});

router.post("/", isNotLoggedIN, async (req, res) => {
    try {
        const { _token } = req.cookies;
        const { id } = req.query;
        const { bundle } = req.body;

        if (!id || !_token || !bundle) return res.status(200).send({ code: 400, message: "Insufficient data" });

        if (await !validateCookie(_token)) {
            return res.status(200).send({ code: 403, message: "Invalid cookie!" });
        }

        // if (!validateUsernameRegex(username)) {
        //     return res.status(200).send({ code: 406, message: "Not a valid data" });
        // }

        // if (await !userExist(username)) {
        //     return res.status(200).send({ code: 404, message: "User doesnt exist!" });
        // }

        // const { identityKey, registrationId, publicSignedPreKeys } = bundle;

        // if (!identityKey || !registrationId || !publicSignedPreKeys)
        //     return res.status(200).send({ code: 400, message: "Insufficient data" });

        UserModel.findByIdAndUpdate(
            id,
            {
                bundle: bundle,
            },
            { new: true },
            (err, doc) => {
                if (err) return res.status(200).send({ code: 502, message: "database error", rawError: err });

                if (!doc) res.status(200).send({ code: 502, message: "Unknown error!" });
                else res.status(200).send({ code: 200, message: "done" });
            },
        );
    } catch (error) {
        res.status(200).send({ code: 502, message: "server error " + error });
    }
});

module.exports = router;
