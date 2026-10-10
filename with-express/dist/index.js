"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pet_1 = require("./data/pet");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 8000;
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.json(pet_1.pets);
});
// 404 catch-all route
app.use((req, res) => {
    res.status(404).json({ message: "Endpoint not found" });
});
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});
