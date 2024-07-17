import express from "express"
import cors from "cors"
import { connectDB } from "./db/db.js";
import dotenv from 'dotenv';
import userRoute from './routes/authUserRoute.js'
import productRoute from './routes/productRoute.js'
import cookieParser from 'cookie-parser'
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const port = 5000;
app.use(express.json());
app.use(cookieParser());
// app.use(cors());

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({
    origin: ['http://localhost:5173', 'http://192.168.43.243:3000'],// replace with your front-end origin
    credentials: true // this is crucial for cookies to be set
}));


const router = express.Router();

app.use(router);

app.listen(port, () => {
    console.log(`App started on port ${port}`);
});

connectDB();


router.get("/", (req, res) => {
    res.send("Router works");
});

app.use("/api/user", userRoute);
app.use("/api/product", productRoute);

// router.post("/api/login", (req, res) => {
//     res.send("Login user");
// });

// router.put("/api/update", (req, res) => {
//     res.send("Update user");
// });

// router.delete("/api/delete", (req, res) => {
//     res.send("Delete user");
// });

