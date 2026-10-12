import type { Express, Request, Response } from "express"
import Employee from "../models/employee.model"
import type { EmployeeType } from "../data/employees";
import mongoose from "mongoose";

// get all employees
export const getAllEmployees = async (
    req: Request,
    res: Response<EmployeeType[] | { message: string }>
) => {
    try {
        const allUsers = await Employee.find();

        res.status(200).json(allUsers);
    } catch (error) {
        console.log("Error fetching all employees");
        res.status(500).json({ message: "Internal server error" });
    }
}

// get employee by ID(both employeeId and MongoDB's _id)
export const getElementById = async (
    req: Request<{ id: string }>,
    res: Response<EmployeeType | { message: string }>
) => {
    try {
        const { id } = req.params;
        let foundUser = null;

        const numericId: number = Number(id);

        if (!isNaN(numericId)) {
            foundUser = await Employee.findOne({ employeeId: numericId });
        }
        else {
            if (mongoose.Types.ObjectId.isValid(id)) {
                foundUser = await Employee.findById(id);
            }
            else {
                return res.status(400).json({ message: "Invalid ID format provided" });
            }
        }

        if (!foundUser) {
            return res.status(404).json({ message: "Document not found" });
        }

        res.status(200).json(foundUser);
    } catch (error) {
        console.log("Error fetching employee by ID");
        res.status(500).json({ message: "Internal server error" });
    }
}