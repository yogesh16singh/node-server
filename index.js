const express = require("express");
const mongoose = require("mongoose");

const app = express();

const env = require('dotenv');
env.config();
app.use(express.json())
const PORT = process.env.PORT || 8081
mongoose.connect('mongodb+srv://ys1997642:database@cluster0.ehbjr4l.mongodb.net/')
    .then(d => {
        console.log("database connected");
    })
    .catch(e => {
        console.log("not connected");
        console.log(e);
    })

let studentSchema = new mongoose.Schema({
    StudentID: Number,
    Name: String,
    Rollno: Number
},
    {
        timestamps: true
    });
const Student = new mongoose.model("Student", studentSchema);
app.get('/test', (req, res) => {
    res.status(200).send('Hello');
});

app.post('/api/student/create', (req, res) => {
    console.log(req.body);
    if (req.body.Name !== undefined) {
        let studentObject = new Student({
            StudentID: req.body.ID,
            Name: req.body.Name,
            Rollno: req.body.Rollno
        });
        studentObject.save()
            .then(d => {
                console.log("saved");
                res.status(201).json({
                    msg: "Student created successfully"
                })
            })
            .catch(e => {
                res.status(400).json({
                    error: e
                })
            })
    } else {
        res.status(400).json({
            msg: "Query parameter required"
        })
    }
});

app.get('/api/getAllStudents', (req, res) => {
    Student.find()
        .then(d => {
            res.status(200).json({
                data: d
            })
        })
        .catch(e => {
            res.status(400).json({
                error: e
            })
        })
});

app.delete('/api/students/:id', (req, res) => {
    console.log(req.params.id);
    Student.deleteOne({ StudentID: req.params.id })
        .then(d => {
            // console.log(d);s
            res.status(202).json({
                msg: "Deleted",
                res: d
            })
        })
        .catch(e => {
            res.status(400).json({
                msg: "Unsuccesfull",
                error: e
            })
        })
});

app.put('/api/student/:id', (req, res) => {
    Student.updateOne({ StudentID: req.params.id },
        { $set: { Name: req.body.name } })
        .then(d => {
            // console.log(d);s
            res.status(200).json({
                msg: "updated",
                res: d
            })
        })
        .catch(e => {
            res.status(400).json({
                msg: "Unsuccesfull",
                error: e
            })
        })
});
app.listen(PORT, () => {
    console.log(`server is running at port no ${PORT}`)
});