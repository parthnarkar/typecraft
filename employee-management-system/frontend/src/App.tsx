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

    type EmployeeStatus = "" | "active" | "inactive";

    type SortOption = "az" | "za" | "salary-high" | "salary-low";

    const [statusFilter, setStatusFilter] = useState<EmployeeStatus>(
        () => {
            const status = new URLSearchParams(window.location.search).get("status");
            return status === "active" || status === "inactive" ? status : "";
        }
    );

    const [sortBy, setSortBy] = useState<SortOption>("az");


    const sortedEmployees = [...employees].sort((a, b) => {
        switch (sortBy) {
            case "az":
                return a.name.localeCompare(b.name);

            case "za":
                return b.name.localeCompare(a.name);

            case "salary-high":
                return b.salary - a.salary;

            case "salary-low":
                return a.salary - b.salary;

            default:
                return 0;
        }
    });



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
                            department: searchDepartment.trim() || undefined,
                            status: statusFilter || undefined
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
    }, [searchName, searchDepartment, statusFilter]);

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
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl space-y-8">

                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <PageHeader
                        title="Employee Management System"
                        description="Manage your employees in one place"
                    />

                    <button
                        type="button"
                        onClick={() => setIsAddDialogOpen(true)}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        >
                            <path d="M12 5v14" />
                            <path d="M5 12h14" />
                        </svg>
                        Add Employee
                    </button>
                </div>

                {/* Search and filters */}
                <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="mb-5">
                        <h2 className="text-base font-semibold text-gray-900">
                            Find employees
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Search, filter and sort your employee records.
                        </p>
                    </div>

                    {/* Search bars */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label
                                htmlFor="search-name"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Employee name
                            </label>

                            <div className="relative">
                                <svg
                                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                >
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.35-4.35" />
                                </svg>

                                <input
                                    id="search-name"
                                    type="search"
                                    placeholder="Search by name..."
                                    value={searchName}
                                    onChange={(event) => setSearchName(event.target.value)}
                                    className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="search-department"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Department
                            </label>

                            <div className="relative">
                                <svg
                                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="3" y="7" width="18" height="14" rx="2" />
                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                </svg>

                                <input
                                    id="search-department"
                                    type="search"
                                    placeholder="Search by department..."
                                    value={searchDepartment}
                                    onChange={(event) => setSearchDepartment(event.target.value)}
                                    className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Status and sorting */}
                    <div className="mt-6 flex flex-col gap-5 border-t border-gray-100 pt-5 sm:flex-row sm:items-end sm:justify-between">
                        <fieldset>
                            <legend className="mb-3 text-sm font-medium text-gray-700">
                                Employment status
                            </legend>

                            <div className="flex flex-wrap items-center gap-3">
                                <label
                                    className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition ${statusFilter === "active"
                                            ? "border-green-300 bg-green-50 text-green-700"
                                            : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="employee-status"
                                        value="active"
                                        checked={statusFilter === "active"}
                                        onChange={() => setStatusFilter("active")}
                                        className="h-4 w-4 accent-green-600"
                                    />
                                    Active
                                </label>

                                <label
                                    className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition ${statusFilter === "inactive"
                                            ? "border-gray-300 bg-gray-100 text-gray-700"
                                            : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="employee-status"
                                        value="inactive"
                                        checked={statusFilter === "inactive"}
                                        onChange={() => setStatusFilter("inactive")}
                                        className="h-4 w-4 accent-gray-600"
                                    />
                                    Inactive
                                </label>

                                {statusFilter && (
                                    <button
                                        type="button"
                                        onClick={() => setStatusFilter("")}
                                        className="rounded-lg px-2 py-2 text-sm text-blue-600 transition hover:bg-blue-50"
                                    >
                                        Clear filter
                                    </button>
                                )}
                            </div>
                        </fieldset>

                        <div className="w-full sm:w-56">
                            <label
                                htmlFor="sort-employees"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Sort employees
                            </label>

                            <select
                                id="sort-employees"
                                value={sortBy}
                                onChange={(event) =>
                                    setSortBy(event.target.value as SortOption)
                                }
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            >
                                <option value="az">A–Z · Name</option>
                                <option value="za">Z–A · Name</option>
                                <option value="salary-high">↑ High Salary</option>
                                <option value="salary-low">↓ Low Salary</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Employee list */}
                <section>
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Employees
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            View and manage your employee records.
                        </p>
                    </div>

                    {loading ? (
                        <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center">
                            <p className="text-sm text-gray-500">
                                Loading employees...
                            </p>
                        </div>
                    ) : error ? (
                        <div className="rounded-2xl border border-red-200 bg-white px-4 py-12 text-center">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    ) : (
                        <EmployeeList
                            employees={sortedEmployees}
                            onDelete={handleDeleteEmployee}
                            onEdit={handleEditEmployee}
                        />
                    )}
                </section>

                {/* Add employee dialog */}
                {isAddDialogOpen && (
                    <AddEmployeeDialog
                        onClose={() => setIsAddDialogOpen(false)}
                        onSubmit={handleAddEmployee}
                    />
                )}

                {/* Edit employee dialog */}
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
        </div>
    );

}

export default App;