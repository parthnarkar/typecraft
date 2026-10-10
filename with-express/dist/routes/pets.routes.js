"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.petRouter = void 0;
const express_1 = __importDefault(require("express"));
const pets_controllers_1 = require("../controllers/pets.controllers");
exports.petRouter = express_1.default.Router();
// Response is a generic, so we are mentioning in <> that what we are typing
exports.petRouter.get('/', pets_controllers_1.getPets);
exports.petRouter.use('/:id', pets_controllers_1.getPetById);
