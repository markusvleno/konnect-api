const { validateCookie } = require("./cookie");

const isLoggedIn = async (req, res, next) => {
    const { _token } = req.cookies;

    if (!_token) {
        next();
    } else {
        if (await validateCookie(_token)) {
            return res.redirect("/app");
        } else {
            res.clearCookie("_token", { path: "/" });
            next();
        }
    }
};

const isNotLoggedIN = async (req, res, next) => {
    const { _token } = req.cookies;

    if (!_token) return res.redirect("/login");

    if (await validateCookie(_token)) next();
    else {
        res.clearCookie("_token", { path: "/" });
        return res.redirect("/login");
    }
};

module.exports = { isLoggedIn, isNotLoggedIN };
