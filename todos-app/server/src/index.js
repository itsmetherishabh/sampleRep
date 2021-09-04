import express, { json } from "express";
import cors from "cors";
import mongoose from 'mongoose';

import todoRouter from "./api/todos";

import { DB, PORT } from "./config";
// Initialize Express App
const app = express();

// Apply Middlewares
app.use(json());
app.use(cors());

// My Custom Middleware function
const myCustomMiddleware = (req, res, next) => {
    console.log('Access path ', req.originalUrl);
    // return res.json({
    //     message: "NOT ACCESSIBLE AT THE MOMENT..."
    // })
    return next();
}

// Implementing custom middleware
app.use(myCustomMiddleware);

// Add Todo Routes to the main app
app.use('/api/todos', todoRouter);

app.get('/', (req, res) => {
    return res.status(200).json({
        message: "Server is running..."
    });
});

const main = async () => {
    try {
        // connect with db
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Database connected...`);
        // Start listening on PORT whatever
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
    } catch (err) {
        console.log(err.message);
    }
}

main();