import express from 'express';
import type { Express, Request, Response } from 'express';
import { pets, Pet } from './data/pet';
import cors from 'cors'

const app: Express = express();
const PORT: number = 8000;

app.use(cors());

type PetQueryParams = {
    species?: string,
    adopted?: 'true' | 'false',
    minAge?: string,
    maxAge?: string
}

// Response is a generic, so we are mentioning in <> that what we are typing
app.get('/', (
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
})

app.use('/:id', (
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
})

// 404 catch-all route
app.use((req: Request, res: Response<{ message: string }>): void => {
    res.status(404).json({ message: "Endpoint not found" });
})

app.listen(PORT, (): void => {
    console.log(`Listening to port ${PORT}`);
})
