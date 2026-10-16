import type { Employee } from "./EmployeeList";

type EmployeeCardProps = {
    employee: Employee;
    onDelete: (id: string) => void
    onEdit: (employee: Employee) => void
};

const EmployeeCard = ({ employee, onDelete, onEdit }: EmployeeCardProps) => {
    const { name, department, salary, status } = employee;

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        {name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {department}
                    </p>
                </div>

                <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                        }`}
                >
                    {status === "active" ? "Active" : "Inactive"}
                </span>
            </div>

            <div className="my-5 border-t border-gray-100" />

            <div>
                <p className="text-sm text-gray-500">Monthly Salary</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                    ₹{salary.toLocaleString("en-IN")}
                </p>
            </div>

            <div className="mt-5 flex justify-end gap-2 border-t border-gray-100 pt-4">
                <button
                    type="button"
                    onClick={() => onEdit(employee)}
                    aria-label={`Edit ${name}`}
                    title="Edit employee"
                    className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L9 17l-4 1 1-4Z" />
                    </svg>
                </button>

                <button
                    type="button"
                    onClick={() => onDelete(employee._id)}
                    aria-label={`Delete ${name}`}
                    title="Delete employee"
                    className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-red-50 hover:text-red-600"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M3 6h18" />
                        <path d="M8 6V4h8v2" />
                        <path d="m19 6-1 14H6L5 6" />
                        <path d="M10 11v5" />
                        <path d="M14 11v5" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default EmployeeCard;