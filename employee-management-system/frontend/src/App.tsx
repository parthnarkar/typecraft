import { useState, useEffect } from "react"
import axios from "axios";
import EmployeeList from "./components/EmployeeList"
import PageHeader from "./components/PageHeader"
import type { Employee } from "./components/EmployeeList";

function App() {

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
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

        fetchEmployees();
    }, [])

    return (
        <div className="p-8">
            <div className="flex items-center justify-between gap-6">
                <PageHeader
                    title="Employee Management System"
                    description="Manage your employees in one place"
                />

                <button
                    type="button"
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
                <EmployeeList employees={employees} />
            )}
        </div>
    );

}

export default App;