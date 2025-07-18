import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import userRouter from './routes/userRoutes.js';

const app = express()

await connectCloudinary()

app.use(cors({
    origin:["https://autocraft-ai.vercel.app","https://autocraft-bd2i0hy4o-devkaran-jawals-projects.vercel.app"],
     credentials: true
}))
app.use(express.json())

app.get('/', (req, res)=>res.send('Server is Live!'));
app.head('/', (req, res) => {
  res.status(200).end(); 
});

app.use(clerkMiddleware())




app.use(requireAuth())

app.use('/api/ai', aiRouter)
app.use('/api/user', userRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log('Server is running on port', PORT);
})