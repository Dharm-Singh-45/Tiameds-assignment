import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});







