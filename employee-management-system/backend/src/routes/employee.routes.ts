import express from 'express'
import { getAllEmployees , getElementById, createEmployee, updateEmployee, deleteEmployee } from '../controllers/employees.controllers';

export const employeeRoutes = express.Router();

// fetch all employees
employeeRoutes.get('/', getAllEmployees);

// get employee by id
employeeRoutes.get('/:id' , getElementById)

// adding the employee
employeeRoutes.post('/' , createEmployee);

// update the employee
employeeRoutes.put('/:id' , updateEmployee)

// deleting the employee
employeeRoutes.delete('/:id' , deleteEmployee)