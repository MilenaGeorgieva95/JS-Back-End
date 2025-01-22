import mongoose, { Schema, model } from "mongoose";

const url = "mongodb://localhost:27017/studentsDb";

try {
  await mongoose.connect(url);
  console.log("Connected to DB");
} catch (err) {
  console.log("Failed to connect DB ...");
  console.log(err);
}

//Setup mongoose -- Schema --
const studentSchema = new Schema({
  name: String,
  //   age: Number,
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [18, "Student's age must be between 18 and 120"],
    max: 120,
  },
});

//Custom -- method -- on the Schema (no arrow functions)
studentSchema.methods.getInfo = function () {
  return `I am ${this.name} and I am ${this.age} years old.`;
};
studentSchema.method("getInfo", function () {
  return `I am ${this.name} and I am ${this.age} years old.`;
});

//Create custom -- Validation --
try {
  studentSchema.path("age").validate(function (age) {
    return age >= 18 && age <= 120;
  });
} catch (error) {
  console.log(error.message);
}

//Create mongoose -- model --
const Student = model("Student", studentSchema);
//=> collection students

const singleStudent = await Student.findOne({ age: 21 });
//returns object, not array
console.log(singleStudent.getInfo());

//---- CRUD ----

//-- Create --

//-- Insert -- data into db #1
// const newStudent = new Student({name: 'Ellie', age: 22});
// await newStudent.save();

//console.log(newStudent); =>has db id

//-- Insert -- data into db #2
// const createdStudent = await Student.create({ name: "Alie", age: 21});

// console.log(createdStudent);
//=>has db id

//-- Read --

//Array of all document objects
const students = await Student.find();
console.log(students);

//Filter
const filteredStudents = await Student.find({ age: 20 });

//Filter with Operators
const filteredStudents2 = await Student.find({ age: { $ne: 20 } });
console.log(filteredStudents2);

// Student.find({});
// Student.findOne({condition}, {options}, callback);
// Student.findById(id, {options}, callback);

//-- Update -- $set: is not required
// Student.findByIdAndUpdate(id, {$set: {prop:newVal}}, callback);
// Student.updateOne({filter}, {$set: {prop:newVal}}, callback);
// await Student.updateOne({name:'John', age:20}, {name:'Josh', age:21});
// Student.updatemany({filter}, {$set: {prop:newVal}}, callback);

//-- Delete --
// Student.findByIdAndDelete(id, callback);
// Student.deeleteOne({conditions}, {options}, callback);
// Student.deeleteMany({conditions}, {options}, callback);

//-- Count --
//Student.countDocuments().then(console.log)
//Student.countDocuments({age: {$gt: 19}}).then(console.log)
////Student.distinct({age: {$gt: 19}}).then(console.log)

//MongoDB or
const resultStudents = Student.find({
  $or: [{ name: "Ellie" }, { age: 22 }],
});

//Mongoose or (limit, in, lt, gt, nin, nor, select(returns only the 'names' of the result))
const resultStudents2 = await Student.find()
  .where({ name: "Ellie" })
  .or([{ age: 22 },{age:24}])
  .select({age:1, _id:0}); //=> object with 1 true or 0 false

  //.where('age').gt(18).lt(65)
  //.where('facultyNumber).equals('123)
  //.select('name age') => string with spaces
  //.sort({age:-1})
  //.skip(10).limit(10)

  console.log(resultStudents2);
  