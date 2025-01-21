import mongoose from "mongoose";

const url='mongodb://localhost:27017/studentsDb'

const uri ='mongodb+srv://mgeorgieva95@cluster0.3frn6.mongodb.net/studentsDb?retryWrites=true&w=majority&appName=Cluster0'

try {
    await mongoose.connect(uri);
    await mongoose.connect('mongodb://localhost:27017/studentsDb');
    console.log('Connected to DB');
    
} catch (err) {
    console.log('Failed to connect DB ...');
    console.log(err);
}