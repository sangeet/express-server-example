const contactsList = document.getElementById("contacts")

let studentsGlobal = []

function renderContacts(students) {
    contactsList.innerHTML = ""
    students.forEach(student => {
        const listItem = document.createElement("li")
        listItem.innerText = `${student.id} : ${student.name} : ${student.age} years old`
        listItem.addEventListener('click', () => deleteContact(student.id))
        contactsList.appendChild(listItem)
    })
}

fetch("http://localhost:3000/contacts")
    .then(res => res.json())
    .then(json => {
        studentsGlobal = json.data
        renderContacts(json.data);
    })

function updateContact(id) {
    const studentIndex = studentsGlobal.findIndex(st => st.id === id)
    if (studentIndex !== -1) {
        const student = studentsGlobal[studentIndex]
        fetch(`http://localhost:3000/update-student?id=${id}&name=${student.name}&age=5`)
            .then(res => res.json())
            .then(json => {
                studentsGlobal[studentIndex] = json
                renderContacts(studentsGlobal)
            })

    }
}

function deleteContact(id) {
    const studentIndex = studentsGlobal.findIndex(st => st.id === id)
    if (studentIndex !== -1) {
        fetch(`http://localhost:3000/delete-student/${id}`)
            .then(res => res.json())
            .then(() => {
                studentsGlobal.splice(studentIndex, 1)
                renderContacts(studentsGlobal)
            })

    }
}

function fetchContact(id) {
    fetch(`http://localhost:3000/contacts/${id}`)
        .then(res => res.json())
        .then(json => console.log(json))
}

fetch("http://localhost:3000/create-student?id=4&name=Saran&age=18")
    .then(res => res.json())
    .then(student => {
        studentsGlobal.push(student)
        renderContacts(studentsGlobal)
        console.log(student)
    })
