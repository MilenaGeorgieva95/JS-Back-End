import mongoose from "mongoose";

try {
    await mongoose.connect('mongodb://localhost:27017/studentsDb');
    console.log('Connected to DB');
    
} catch (err) {
    console.log('Failed to connect DB ...');
    console.log(err);
}

