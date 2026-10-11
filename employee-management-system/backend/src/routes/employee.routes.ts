import express from 'express'
import type { Response } from 'express';
import { employees } from '../data/employees';
import { Employee } from '../data/employees';

export const employeeRoutes = express.Router();

employeeRoutes.get('/' , (req , res: Response<Employee[]>) => {
    res.json(employees);
})