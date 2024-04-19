import React, { useState } from 'react';
import axios from 'axios';

const Course = () => {
    const [numInputs, setNumInputs] = useState(0); // State to track the number of inputs
    const [formData, setFormData] = useState({
        Name: '',
        Level: '',
        Description: '',
        Image: '',
        Lecture: Array(numInputs).fill({ Instructor: '', Date: '' }) // Initialize Lecture array
    });

    const handleChange = (index: number, name: string, value: string) => {
        const newLecture = [...formData.Lecture];
        newLecture[index][name] = value;

        setFormData({
            ...formData,
            Lecture: newLecture
        });
    };

    const handleAddInput = () => {
        setNumInputs(numInputs + 1);
        setFormData({
            ...formData,
            Lecture: [...formData.Lecture, { Instructor: '', Date: '' }]
        });
    };

    const addData = async () => {
        try {
            const data = await axios.post("http://localhost:8080/course", formData);
            console.log(data);
        } catch (error: any) {
            alert(error.response.data.error)
        }
    };

    const [name, setName] = useState('')

    const addDataOk = async () => {
        try {
            const data = await axios.post('http://localhost:8080/createUser', {
                Name: name,
            })
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className=' space-y-4'>
            <div>
                <input type="text" value={name} placeholder='enter instructor name' onChange={(e) => setName(e.target.value)} />
                <button onClick={addDataOk}>Add User</button>
            </div>
            <input
                type="number"
                value={numInputs}
                onChange={(e) => setNumInputs(parseInt(e.target.value))}
            />
            <button onClick={handleAddInput}>Add Instructor</button>
            <br />
            <br />
            <input
                type="text"
                placeholder="Name"
                value={formData.Name}
                onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
            />
            <br />
            <input
                type="text"
                placeholder="Level"
                value={formData.Level}
                onChange={(e) => setFormData({ ...formData, Level: e.target.value })}
            />
            <br />
            <input
                type="text"
                placeholder="Description"
                value={formData.Description}
                onChange={(e) => setFormData({ ...formData, Description: e.target.value })}
            />
            <br />
            <input
                type="text"
                placeholder="Image"
                value={formData.Image}
                onChange={(e) => setFormData({ ...formData, Image: e.target.value })}
            />
            <br />
            {formData.Lecture.map((lecture, index) => (
                <div key={index}>
                    <input
                        type="text"
                        placeholder="Instructor"
                        value={formData.Lecture[index].Instructor}
                        onChange={(e) => handleChange(index, 'Instructor', e.target.value)}
                    />
                    <input
                        type="Date"
                        placeholder="Date"
                        value={formData.Lecture[index].Date}
                        onChange={(e) => handleChange(index, 'Date', e.target.value)}
                    />
                </div>
            ))}
            <br />
            <button onClick={addData}>Add Course</button>
        </div>
    );
};

export default Course;
