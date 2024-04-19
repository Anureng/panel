import mongoose from "mongoose";

const Course = new mongoose.Schema({
    Name: String,
    Level: String,
    Description: String,
    Image: String,
    Lecture: [{
        Instructor: String,
        Date: String
    }]
})

const allCourse = mongoose.model('course', Course);

export default allCourse