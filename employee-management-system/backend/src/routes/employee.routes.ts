import express from 'express'
import { getAllEmployees , getElementById } from '../controllers/employees.controllers';

export const employeeRoutes = express.Router();

// fetch all employees
employeeRoutes.get('/', getAllEmployees);

// get employee by id
employeeRoutes.get('/:id' , getElementById)