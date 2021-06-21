const { validateCookie } = require("./cookie");

const authenticate = (req, res, next) => {
    console.log("h1");

    if (!req.cookies._token) {
        console.log("h2");
        res.status(401).send({ msg: "Unauthorized" });
        return;
    }

    if (validateCookie(req.cookie._token)) {
        res.redirect("/protected");
    } else {
        console.log("h3");
        if (req.cookie._token) res.clearCookie("_token", { path: "/protected" });
        next();
    }
};

module.exports = { authenticate };
