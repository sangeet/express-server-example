const express = require("express")
const cors = require("cors")
const app = express()

const students = {
    total: 3,
    data: [
        {
            id: 1,
            name: "Sangeet",
            age: 26
        },
        {
            id: 2,
            name: "Ayush",
            age: 18
        },
        {
            id: 3,
            name: "Radha",
            age: 56
        },
    ]
}

app.use(cors());
app.get('/html', (req, res) => {
    res.send(`
    <html>
        <body>
            <h1>Test from Server</h1>
            <p>Test paragraph from Server</p>
            <p style="color:blue">Blue paragraph from Server</p>
        </body>
    </html>
    `)
})

app.get('/contacts', (req, res) => {
    res.json(students)
})

app.get('/contacts/:id', (req, res) => {
    const {id} = req.params
    const studentWithId = students.data.find(st => {
        return st.id === parseInt(id)
    })
    if (studentWithId !== undefined) {
        res.send(studentWithId)
    } else {
        res.status(404).send(`Student with ${id} not found`)
    }
})
// localhost:3000/create-student?id=4&name=Saran&age=18
app.get('/create-student', (req, res) => {
    const {id, name, age} = req.query
    const studentWithId = students.data.find(st => st.id === parseInt(id))
    if (studentWithId === undefined) {
        const student = {id: parseInt(id), name, age: parseInt(age)}
        students.data.push(student)
        res.json(student)
    } else {
        res.status(403).send(`Student with ${id} already exists`)
    }
})

app.get('/update-student', (req, res) => {
    const {id, name, age} = req.query
    const studentIndex = students.data.findIndex(st => st.id === parseInt(id))
    if (studentIndex !== -1) {
        const student = {id: parseInt(id), name, age: parseInt(age)}
        students.data[studentIndex] = student
        res.json(student)
    } else {
        res.status(403).send(`Student with ${id} does not exists`)
    }
})

app.get('/delete-student/:id', (req, res) => {
    const {id} = req.params
    const studentIndex = students.data.findIndex(st => st.id === parseInt(id))
    if (studentIndex !== -1) {
        const student = students.data[studentIndex]
        students.data.splice(studentIndex, 1);
        res.json(student)
    } else {
        res.status(403).send(`Student with ${id} does not exists`)
    }
})

app.listen(3000, () => {
    console.log("App started in port 3000")
})