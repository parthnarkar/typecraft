import express from 'express';
import type { Express, Request, Response } from 'express';
import { pets } from './data/pet';
import cors from 'cors'

const app: Express = express();
const PORT: number = 8000;

app.use(cors());


app.get('/', (req: Request, res: Response): void => {
    res.json(pets);
})

// 404 catch-all route
app.use((req: Request, res: Response): void => {
    res.status(404).json({ message: "Endpoint not found" });
})

app.listen(PORT, (): void => {
    console.log(`Listening to port ${PORT}`);
})
