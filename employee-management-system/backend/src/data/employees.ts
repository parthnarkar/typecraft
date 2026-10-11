export type Employee = {
    name: string,
    department: string,
    salary: number,
    status: "active" | "inactive"
}

export const employees: Employee[] = [
    {
        name: "Rahul Sharma",
        department: "Engineering",
        salary: 75000,
        status: "active"
    },
    {
        name: "Priya Patel",
        department: "Human Resources",
        salary: 55000,
        status: "active"
    },
    {
        name: "Amit Verma",
        department: "Finance",
        salary: 65000,
        status: "inactive"
    },
    {
        name: "Sneha Desai",
        department: "Marketing",
        salary: 60000,
        status: "active"
    },
    {
        name: "Karan Mehta",
        department: "Engineering",
        salary: 85000,
        status: "inactive"
    }
];