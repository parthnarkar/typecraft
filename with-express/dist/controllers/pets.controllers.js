"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPetById = exports.getPets = void 0;
const pet_1 = require("../data/pet");
const getPets = (req, res) => {
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
};
exports.getPets = getPets;
const getPetById = (req, res) => {
    const { id } = req.params;
    const findPet = pet_1.pets.find((pet) => pet.id?.toString() === id);
    if (findPet) {
        res.json(findPet);
    }
    else {
        res.status(404).json({ message: "No pet with that ID" });
    }
};
exports.getPetById = getPetById;
