import mongoose, {Schema, model} from "mongoose";

const url='mongodb://localhost:27017/studentsDb'

try {
    await mongoose.connect(url);
    console.log('Connected to DB');
    
} catch (err) {
    console.log('Failed to connect DB ...');
    console.log(err);
}

//Setup mongoose schema
const studentSchema = new Schema({
    name: String,
    age: Number
});

//Create mongoose model
const Student = model('Student', studentSchema);
//=> collection students

//Query all data from model => array of document objects
const students = await Student.find();
console.log(students);

//Filter
const filteredStudents=await Student.find({age:20});

//Filter with Operators
const filteredStudents2=await Student.find({age: {$ne: 20}});
console.log(filteredStudents2);

