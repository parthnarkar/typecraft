"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 8000;
const pets = [
    {
        name: "Rubik",
        species: "Cat",
        age: 3
    },
    {
        name: "Parth",
        species: "Dog",
        age: 10
    }
];
app.get('/', (req, res) => {
    return res.json(pets);
});
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});
