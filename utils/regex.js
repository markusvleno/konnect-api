const usernameRegex = /^[a-zA-Z0-9._]{5,30}$/i;
const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

const validateUsernameRegex = (username = "default") => {
    return RegExp(usernameRegex).test(username);
};

const validateEmailRegex = (email = "default") => {
    return RegExp(emailRegex).test(email);
};

module.exports = { validateUsernameRegex, validateEmailRegex };
