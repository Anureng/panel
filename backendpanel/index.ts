import express from "express";
import mongoose from "mongoose"
import allCourse from './model/Course'
import InstructorModel from './model/User'
import cors from "cors"
const app = express()


app.use(cors())
const port = 8080

const connect = 'mongodb+srv://anuragsidhu:test123@cluster0.nnj9xje.mongodb.net/panel'

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

app.use(express.json());

mongoose.connect(connect)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });
app.listen(port, () => {
    console.log("listening on port 8080");
})


app.get('/', async (req, res) => {
    console.log("hello");
})

app.post('/course', async (req, res) => {
    try {
        const body = req.body;
        const lectures = body.Lecture;

        if (!Array.isArray(lectures)) {
            return res.status(400).json({ error: 'Lectures should be provided as an array' });
        }

        const instructors = await InstructorModel.find();

        const lectureMap = new Map();

        let duplicateLecture = false;
        for (const lecture of lectures) {
            const lectureKey = lecture.Name + lecture.Date;

            const instructor = instructors.find(instructor => instructor.Name === lecture.Instructor);
            if (!instructor) {
                return res.status(400).json({ error: 'Instructor not found for one or more lectures' });
            }

            if (lectureMap.has(lectureKey)) {
                duplicateLecture = true;
                break;
            } else {
                lectureMap.set(lectureKey, true);
            }
        }

        if (duplicateLecture) {
            return res.status(400).json({ error: 'Cannot assign the same instructor to multiple lectures on the same day' });
        }

        const existingCourse = await allCourse.findOne({ Name: body.Name });
        if (existingCourse) {
            return res.status(400).json({ error: 'Course with the same name already exists' });
        }

        const newCourse = await allCourse.create({
            Name: body.Name,
            Level: body.Level,
            Description: body.Description,
            Image: body.Image,
            Lecture: body.Lecture
        });


        for (const lecture of lectures) {
            const instructor = instructors.find(instructor => instructor.Name === lecture.Instructor);
            if (instructor) {
                const updatedDate = instructor.Date ? `${instructor.Date}, ${lecture.Date}` : lecture.Date;
                await InstructorModel.findByIdAndUpdate(instructor._id, { Date: updatedDate });
            }
        }

        return res.status(200).json({ course: newCourse });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/GetCourse', async (req, res) => {
    try {
        const get = await allCourse.find()
        return res.status(200).json(get);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get('/GetUser/:id', async (req, res) => {
    try {
        const id = req.params.id
        const findCourse = await InstructorModel.findById(id)
        return res.status(200).json(findCourse)
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)

    }
})


app.post('/updateCourse/:id', async (req, res) => {
    try {
        const id = req.params.id
        const findCourse = await allCourse.findById(id)
        if (!findCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }

        const newLecture = req.body.Lecture;
        const lectureMap = new Map();
        const lectures = req.body.Lecture;

        let duplicateLecture = false;
        for (const lecture of lectures) {
            const lectureKey = lecture.Name + lecture.Date;
            if (lectureMap.has(lectureKey)) {
                duplicateLecture = true;
                break;
            } else {
                lectureMap.set(lectureKey, true);
            }
        }

        if (duplicateLecture) {
            return res.status(400).json({ error: 'Cannot add duplicate lecture with the same instructor and date' });
        }

        findCourse.Lecture.push(newLecture)

        const updateCourse = await findCourse.save()
        return res.status(200).json({ updateCourse })
    } catch (error) {
        console.log(error);

        return res.status(404).json({ error })
    }
})

app.post("/createUser", async (req, res) => {
    try {
        const create = await InstructorModel.create({
            Name: req.body.Name,
            Lecture: req.body.Lecture,
            Date: ""
        })
        return res.status(200).json({ create });
    } catch (error) {
        return res.status(404).json(error);
    }
})

app.get("/allUser", async (req, res) => {
    try {

        const get = await InstructorModel.find()
        return res.status(200).json(get);
    } catch (error) {
        return res.status(404).json(error);
    }
})


