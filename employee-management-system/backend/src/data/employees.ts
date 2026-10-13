export type EmployeeType = {
    employeeId: number;
    name: string,
    department: string,
    salary: number,
    status: "active" | "inactive"
}

// mock data
export const employees: EmployeeType[] = [
    {
        employeeId: 1,
        name: "Rahul Sharma",
        department: "Engineering",
        salary: 75000,
        status: "active"
    },
    {
        employeeId: 2,
        name: "Priya Patel",
        department: "Human Resources",
        salary: 55000,
        status: "active"
    },
    {
        employeeId: 3,
        name: "Amit Verma",
        department: "Finance",
        salary: 65000,
        status: "inactive"
    },
    {
        employeeId: 4,
        name: "Sneha Desai",
        department: "Marketing",
        salary: 60000,
        status: "active"
    },
    {
        employeeId: 5,
        name: "Karan Mehta",
        department: "Engineering",
        salary: 85000,
        status: "inactive"
    }
];