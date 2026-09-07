type User = {
    id: number
    username: string
    role: "member" | "contributor" | "admin"
}

type UpdatedUser = Partial<User>

let nextUserId = 1

const users: User[] = [
    { id: nextUserId++, username: "john_doe", role: "member" },
    { id: nextUserId++, username: "jane_smith", role: "contributor" }
];

function updateUser(id: number, updates: UpdatedUser) {
    const foundUser = users.find(user => user.id === id)
    if (!foundUser) {
        console.error("User not found!")
        return
    }
    Object.assign(foundUser, updates)
}

// updateUser(1, { username: "new_john_doe" });
// updateUser(4, { role: "contributor" });

// NOW OMIT IS HAVING ALL PROPERTIES OF "User" except "id" (we can include more argument like "id" | "username")
function addNewUser(newUser: Omit<User, "id">): User {
    let user: User = {
        id: nextUserId++,
        ...newUser
    };
    users.push(user);
    return user;
}

// example usage:
addNewUser({ username: "joe_schmoe", role: "member" })

console.log(users)