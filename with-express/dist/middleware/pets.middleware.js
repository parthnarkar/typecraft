"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pleaseAuth = exports.validateNumbericId = void 0;
const validateNumbericId = (req, res, next) => {
    const { id } = req.params;
    if (!/^\d+$/.test(id)) {
        res.status(404).json({ message: "Pet ID must be a number" });
    }
    else {
        next();
    }
};
exports.validateNumbericId = validateNumbericId;
const pleaseAuth = (req, res, next) => {
    const { password } = req.query;
    if (password === 'please') {
        next();
    }
    else {
        res.status(401).json({ message: "Unauthorised User" });
    }
};
exports.pleaseAuth = pleaseAuth;
