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
// Response is a generic, so we are mentioning in <> that what we are typing
app.get('/', (req, res) => {
    const { species, adopted, minAge, maxAge } = req.query;
    let filteredPets = pet_1.pets;
    if (species) {
        filteredPets = filteredPets.filter((pet) => pet.species.toLowerCase() === species.toLowerCase());
    }
    if (adopted) {
        // the below is written by me and it also works
        // filteredPets = filteredPets.filter((pet: Pet): boolean => pet.adopted.toString() === adopted.toLowerCase());
        filteredPets = filteredPets.filter((pet) => pet.adopted === JSON.parse(adopted));
    }
    if (minAge) {
        filteredPets = filteredPets.filter((pet) => pet.age >= JSON.parse(minAge));
    }
    if (maxAge) {
        filteredPets = filteredPets.filter((pet) => pet.age <= JSON.parse(maxAge));
    }
    res.json(filteredPets);
});
app.use('/:id', (req, res) => {
    const { id } = req.params;
    const findPet = pet_1.pets.find((pet) => pet.id?.toString() === id);
    if (findPet) {
        res.json(findPet);
    }
    else {
        res.status(404).json({ message: "No pet with that ID" });
    }
});
// 404 catch-all route
app.use((req, res) => {
    res.status(404).json({ message: "Endpoint not found" });
});
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});
