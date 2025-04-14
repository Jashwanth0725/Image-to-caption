import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

app.use(cors({
    origin: `${process.env.CORS_ORIGIN}`,
}))

app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));
app.use(cookieParser());
app.use(express.static('public'));


import aiApiRoutes from './routes/generate.routes.js';

app.use('/api/v1/generate', aiApiRoutes);

export default app; 