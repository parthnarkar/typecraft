import { useState, useEffect } from "react"
import axios from "axios";
import EmployeeList from "./components/EmployeeList"
import PageHeader from "./components/PageHeader"
import type { Employee } from "./components/EmployeeList";
import AddEmployeeDialog from "./components/AddEmployeeDialog";

type NewEmployee = Omit<Employee, "_id" | "employeeId">;

function App() {

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get<Employee[]>("http://localhost:3000/employees")

            setEmployees(response.data);
        }
        catch (error) {
            console.error("Failed to fetch employees:", error);
            setError("Failed to load employees. Please try again.");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchEmployees();
    }, [])

    const handleAddEmployee = async (employee: NewEmployee) => {
        const response = await axios.post<Employee>("http://localhost:3000/employees", employee)

        setEmployees((currentEmployees) => [
            ...currentEmployees,
            response.data
        ]);

        setIsAddDialogOpen(false);
    }

    const handleDeleteEmployee = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3000/employees/${id}`);

            setEmployees((currentEmployees) =>
                currentEmployees.filter(
                    (employee) => employee._id !== id
                )
            );
        } catch (error) {
            console.error("Failed to delete employee:", error);
        }
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between gap-6">
                <PageHeader
                    title="Employee Management System"
                    description="Manage your employees in one place"
                />

                <button
                    type="button"
                    onClick={() => setIsAddDialogOpen(true)}
                    className="rounded-xl border border-blue-400 bg-blue-100 p-3 text-blue-700 hover:bg-blue-200"
                >
                    Add Employee
                </button>
            </div>

            {loading ? (
                <p className="mt-8 text-center text-gray-500">
                    Loading employees...
                </p>
            ) : error ? (
                <p className="mt-8 text-center text-red-500">
                    {error}
                </p>
            ) : (
                <EmployeeList employees={employees} onDelete={handleDeleteEmployee} />
            )}

            {isAddDialogOpen && (
                <AddEmployeeDialog
                    onClose={() => setIsAddDialogOpen(false)}
                    onSubmit={handleAddEmployee}
                />
            )}
        </div>
    );

}

export default App;