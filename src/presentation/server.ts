import express from 'express';
import userRoutes from '../presentation/routes/user.routes';

const app = express();

app.use(express.json());

app.use("/api/user", userRoutes);

app.get("/api/health", (req, res) => {
    res.status(200).json("Welcome to the Decoupled API");
});

export {app};