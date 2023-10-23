import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from 'dotenv'
import postRoutes from './routes/posts.js';

const app = express();
app.use(bodyParser.json({ limit: '30mb', extended: 'true' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: 'true' }));
app.use(cors());
dotenv.config();
app.use('/posts', postRoutes);

const CONNECTION_URL = process.env.MONGO_URI
const PORT = process.env.PORT

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => { console.log(`server running on port: ${PORT}`) }))
    .catch((error) => {
        console.log(error.message);
    })

// mongoose.set('useFindAndModify', false);