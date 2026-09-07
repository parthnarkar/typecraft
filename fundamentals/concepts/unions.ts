// Syntax 1
type User = {
    username: string
    role: "guest" | "member" | "admin"
}

// Syntax 2
type UserRole = "guest" | "admin" | "member";


// the below gives us error: Type '"alsdfkjasf"' is not assignable to type 'UserRole'.
let userRole: UserRole = "alsdfkjasf"