import type { Request, Response } from "express"
import Employee from "../models/employee.model"
import type { EmployeeType } from "../data/employees";
import mongoose from "mongoose";

type EmployeeQueryType = {
    name?: string,
    department?: string,
    status?: "active" | "inactive",
}

// get all employees
export const getAllEmployees = async (
    req: Request<{}, unknown, {}, EmployeeQueryType>,
    res: Response<EmployeeType[] | { message: string }>
) => {
    try {
        const { name, department, status } = req.query;

        const filter: Record<string, unknown> = {};

        // search by name (partial)
        if (name?.trim()) {
            filter.name = {
                $regex: name.trim(),
                $options: "i"
            };
        }

        if (department?.trim()) {
            filter.department = {
                $regex: department.trim(),
                $options: "i"
            }
        }

        if (status?.trim()) {
            filter.status = status.trim();
        }

        const employees: EmployeeType[] = await Employee.find(filter);

        res.status(200).json(employees);

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

// adding the employee
export const createEmployee = async (
    req: Request<{}, unknown, EmployeeType>,
    res: Response
) => {
    try {
        const { name, department, salary, status } = req.body;

        if (
            !name?.trim() ||
            !department?.trim() ||
            salary === undefined ||
            typeof salary !== "number" ||
            !Number.isFinite(salary) ||
            salary < 0 ||
            (status !== undefined && !["active", "inactive"].includes(status))) {
            res.status(400).json({
                message: "Please provide valid name, department and salary and status",
            });
            return;
        }

        const lastEmployee = await Employee.findOne().sort({ employeeId: -1 });

        const employeeId = lastEmployee ? lastEmployee.employeeId + 1 : 1;

        const newEmployee = await Employee.create({
            employeeId,
            name: name.trim(),
            department: department.trim(),
            salary,
            status
        });

        res.status(201).json(newEmployee);
    } catch (error) {
        console.error("Error adding employee:", error);

        res.status(500).json({
            message: "Internal server error",
        });
    }
}

// UPDATE THE EMPLOYEE
export const updateEmployee = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid employee ID" });
            return;
        }

        const { name, department, salary, status } = req.body;

        const updates: Record<
            string,
            string | number
        > = {}

        if (name !== undefined) updates.name = name;
        if (department !== undefined) updates.department = department;
        if (salary !== undefined) updates.salary = salary;
        if (status !== undefined) updates.status = status;

        const employee = await Employee.findByIdAndUpdate(
            id,
            { $set: updates },
            { returnDocument: "after", runValidators: true }
        )

        if (!employee) {
            res.status(404).json({ message: "Employee not found" });
            return;
        }

        res.status(200).json({ message: "Employee Updated Successfully", employee });
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// deleting an employee
export const deleteEmployee = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid employee ID" });
            return;
        }

        const employee = await Employee.findByIdAndDelete(id);

        if (!employee) {
            res.status(404).json({ message: "Employee not found" });
            return;
        }

        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ message: "Internal server error" });
    }
} 