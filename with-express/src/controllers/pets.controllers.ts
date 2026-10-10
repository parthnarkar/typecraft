import { Request, Response } from "express";
import { Pet, pets } from "../data/pet";

export type PetQueryParams = {
    species?: string,
    adopted?: 'true' | 'false',
    minAge?: string,
    maxAge?: string
}

export const getPets = (
    req: Request<{}, unknown, {}, PetQueryParams>,
    res: Response<Pet[]>
): void => {
    const { species, adopted, minAge, maxAge } = req.query;

    let filteredPets: Pet[] = pets

    if (species) {
        filteredPets = filteredPets.filter((pet: Pet): boolean => pet.species.toLowerCase() === species.toLowerCase());
    }
    if (adopted) {
        // the below is written by me and it also works
        // filteredPets = filteredPets.filter((pet: Pet): boolean => pet.adopted.toString() === adopted.toLowerCase());

        filteredPets = filteredPets.filter((pet: Pet): boolean => pet.adopted === JSON.parse(adopted));
    }

    if (minAge) {
        filteredPets = filteredPets.filter((pet: Pet): boolean => pet.age >= JSON.parse(minAge))
    }

    if (maxAge) {
        filteredPets = filteredPets.filter((pet: Pet): boolean => pet.age <= JSON.parse(maxAge))
    }

    res.json(filteredPets);
}

export const getPetById = (
    req: Request<{ id: string }>,
    res: Response<Pet | { message: string }>
): void => {
    const { id } = req.params;
    const findPet: Pet | undefined = pets.find((pet: Pet): boolean => pet.id?.toString() === id);

    if (findPet) {
        res.json(findPet)
    } else {
        res.status(404).json({ message: "No pet with that ID" })
    }
}