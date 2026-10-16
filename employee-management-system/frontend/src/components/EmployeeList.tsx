import type { JSX } from "react/jsx-runtime";
import EmployeeCard from "./EmployeeCard";

export type Employee = {
    _id: string,
    name: string,
    department: string,
    salary: number,
    status: "active" | "inactive"
}

type EmployeeListProps = {
    employees: Employee[]
}

export const EmployeeList = ({ employees }: EmployeeListProps): JSX.Element => {
    if (employees.length === 0) {
        return (
            <p className="mt-8 text-center text-gray-500">
                No employees found.
            </p>
        );
    }

    return (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {employees.map((employee) => (
                <EmployeeCard
                    key={employee._id}
                    employee={employee}
                />
            ))}
        </div>
    )
}

export default EmployeeList;