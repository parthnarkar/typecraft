import { useState } from "react";

type AddEmployeeDialogPropsOnSubmit = {
    name: string;
    department: string;
    salary: number;
    status: "active" | "inactive";
}

type AddEmployeeDialogProps = {
    onClose: () => void;
    onSubmit: (employee: AddEmployeeDialogPropsOnSubmit) => void;
};

const AddEmployeeDialog = ({
    onClose,
    onSubmit,
}: AddEmployeeDialogProps) => {
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [salary, setSalary] = useState("");
    const [status, setStatus] = useState<"active" | "inactive">("active");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        onSubmit({
            name: name.trim(),
            department,
            salary: Number(salary),
            status,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="add-employee-title"
                className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-xl"
            >
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h2
                            id="add-employee-title"
                            className="text-xl font-semibold text-gray-900"
                        >
                            Add Employee
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Enter the details of your new employee.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close dialog"
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="employee-name"
                            className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                            Full Name
                        </label>
                        <input
                            id="employee-name"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="e.g. Rahul Sharma"
                            required
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="employee-department"
                            className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                            Department
                        </label>
                        <input
                            id="employee-department"
                            type="text"
                            value={department}
                            onChange={(event) => setDepartment(event.target.value)}
                            placeholder="e.g. Engineering"
                            required
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="employee-salary"
                            className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                            Monthly Salary (₹)
                        </label>
                        <input
                            id="employee-salary"
                            type="number"
                            min="0"
                            step="1"
                            value={salary}
                            onChange={(event) => setSalary(event.target.value)}
                            placeholder="e.g. 50000"
                            required
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="employee-status"
                            className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                            Status
                        </label>
                        <select
                            id="employee-status"
                            value={status}
                            onChange={(event) =>
                                setStatus(event.target.value as "active" | "inactive")
                            }
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            Add Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployeeDialog;