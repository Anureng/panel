import mongoose from "mongoose";

const Instructor = new mongoose.Schema({
    Name: String,
    Lecture: String,
    Date: String,
})

const InstructorModel = mongoose.model("Instructor", Instructor)

export default InstructorModel