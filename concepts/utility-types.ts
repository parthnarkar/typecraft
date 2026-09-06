type User = {
    id: number
    username: string
    role: "member" | "contributor" | "admin"
}

// Partial<Type>
// Constructs a type with all properties of Type set to optional. This utility will return a type that represents all subsets of a given type.
type UpdatedUser = Partial<User>

const users: User[] = [
    { id: 1, username: "john_doe", role: "member" },
    { id: 2, username: "jane_smith", role: "contributor" },
    { id: 3, username: "alice_jones", role: "admin" },
    { id: 4, username: "charlie_brown", role: "member" },
];

function updateUser(id: number, updates: UpdatedUser) {
    // Find the user in the array by the id
    // Use Object.assign to update the found user in place. 

    const selectedUser: User | undefined = users.find((user) => user.id === id);
    if (!selectedUser) {
        return;
    }

    Object.assign(selectedUser, updates);
}

// Example updates:
updateUser(1, { username: "new_john_doe" });
updateUser(4, { role: "contributor" });

console.log(users)