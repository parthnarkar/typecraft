import express from "express";
import type { Router, Request, Response } from "express";
import { getPetById, getPets } from "../controllers/pets.controllers";

import { validateNumbericId, pleaseAuth } from "../middleware/pets.middleware";

export const petRouter: Router = express.Router();

// Response is a generic, so we are mentioning in <> that what we are typing
petRouter.get('/', getPets)

petRouter.use('/:id', pleaseAuth, validateNumbericId, getPetById)