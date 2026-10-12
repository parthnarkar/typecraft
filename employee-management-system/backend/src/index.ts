import express from 'express'
import type { Express, Request, Response } from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose';

// morgan used for terminal logging of HTTP requests
import morgan from 'morgan';

import { employeeRoutes } from './routes/employee.routes';

const app: Express = express();
dotenv.config();
app.use(cors());

app.use(morgan('dev'));

type EnvTypes = string | undefined;

const MONGO_URL: EnvTypes = process.env.MONGO_URI;
const PORT: EnvTypes = process.env.PORT;

if (!MONGO_URL) {
    throw new Error("MONGO_URI is missing in .env");
}

if (!PORT) {
    throw new Error("PORT doesn't exist")
}

mongoose.connect(MONGO_URL)
    .then((): void => console.log("Connection Success"))
    .catch((err): void => console.log("Connection Error: ", err));

app.listen(PORT, (): void => {
    console.log("Server running at ", PORT);
})

app.use('/employees', employeeRoutes)