import express from 'express';
import type { Express } from 'express';

const app: Express = express();
const PORT: number = 8000;

type PetType = {
    name: string,
    species: string,
    adopted: boolean,
    age: number
}

const pets: Omit<PetType, "adopted">[] = [
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
]

app.get('/', (req, res) => {
    return res.json(pets);
})

app.listen(PORT, (): void => {
    console.log(`Listening to port ${PORT}`);
})
