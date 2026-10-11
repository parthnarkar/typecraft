"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)());
const MONGO_URL = process.env.MONGO_URI;
const PORT = process.env.PORT;
if (!MONGO_URL) {
    throw new Error("MONGO_URI is missing in .env");
}
if (!PORT) {
    throw new Error("PORT doesn't exist");
}
mongoose_1.default.connect(MONGO_URL)
    .then(() => console.log("Connection Success"))
    .catch((err) => console.log("Connection Error: ", err));
app.listen(PORT, () => {
    console.log("Server running at ", PORT);
});
app.get('/', (req, res) => {
    res.send("Connected to MongoDB!");
});
