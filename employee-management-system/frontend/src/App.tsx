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
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

    const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const [searchName, setSearchName] = useState(
        () => new URLSearchParams(window.location.search).get("name") ?? "");

    const [searchDepartment, setSearchDepartment] = useState(
        () => new URLSearchParams(window.location.search).get("department") ?? "");


    useEffect(() => {
        let cancelled = false;

        const fetchEmployees = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await axios.get<Employee[]>(
                    "http://localhost:3000/employees",
                    {
                        params: {
                            name: searchName.trim() || undefined,
                            department: searchDepartment.trim() || undefined
                        }
                    }
                );

                if (!cancelled) {
                    setEmployees(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch employees:", error);

                if (!cancelled) {
                    setError("Failed to load employees. Please try again.");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchEmployees();

        return () => {
            cancelled = true;
        };
    }, [searchName, searchDepartment]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (searchName.trim()) {
            params.set("name", searchName.trim());
        } else {
            params.delete("name");
        }

        if (searchDepartment.trim()) {
            params.set("department", searchDepartment.trim());
        } else {
            params.delete("department");
        }

        const query = params.toString();

        const newUrl = query
            ? `${window.location.pathname}?${query}`
            : window.location.pathname;

        window.history.replaceState({}, "", newUrl);
    }, [searchName, searchDepartment]);

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

    const handleEditEmployee = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsEditDialogOpen(true);
    };

    const handleUpdateEmployee = async (
        id: string,
        updatedData: {
            name: string;
            department: string;
            salary: number;
            status: "active" | "inactive";
        }
    ) => {
        const response = await axios.put<{
            message: string,
            employee: Employee
        }>(
            `http://localhost:3000/employees/${id}`,
            updatedData
        );

        const updatedEmployee = response.data.employee;

        setEmployees((currentEmployees) =>
            currentEmployees.map((employee) =>
                employee._id === id ? updatedEmployee : employee
            )
        );

        setIsAddDialogOpen(false);
        setSelectedEmployee(null);
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between gap-6">
                <PageHeader
                    title="Employee Management System"
                    description="Manage your employees in one place"
                />


                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="search-name"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Search by name
                        </label>

                        <input
                            id="search-name"
                            type="search"
                            placeholder="Enter employee name..."
                            value={searchName}
                            onChange={(event) => setSearchName(event.target.value)}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="search-department"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Search by department
                        </label>

                        <input
                            id="search-department"
                            type="search"
                            placeholder="Enter department..."
                            value={searchDepartment}
                            onChange={(event) => setSearchDepartment(event.target.value)}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                </div>


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
                <EmployeeList
                    employees={employees}
                    onDelete={handleDeleteEmployee}
                    onEdit={handleEditEmployee}
                />
            )}

            {isAddDialogOpen && (
                <AddEmployeeDialog
                    onClose={() => setIsAddDialogOpen(false)}
                    onSubmit={handleAddEmployee}
                />
            )}

            {isEditDialogOpen && selectedEmployee && (
                <AddEmployeeDialog
                    key={selectedEmployee._id}
                    employee={selectedEmployee}
                    onClose={() => {
                        setIsEditDialogOpen(false);
                        setSelectedEmployee(null);
                    }}
                    onSubmit={(updatedData) =>
                        handleUpdateEmployee(selectedEmployee._id, updatedData)
                    }
                />
            )}
        </div>
    );
}

export default App;