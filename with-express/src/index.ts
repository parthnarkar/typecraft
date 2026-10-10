import express from 'express';
import type { Express, Request, Response } from 'express';
import cors from 'cors'
import { petRouter } from './routes/pets.routes';

const app: Express = express();
const PORT: number = 8000;

app.use(cors());

app.use('/pets', petRouter)

// 404 catch-all route
app.use((req: Request, res: Response<{ message: string }>): void => {
    res.status(404).json({ message: "Endpoint not found" });
})

app.listen(PORT, (): void => {
    console.log(`Listening to port ${PORT}`);
})
