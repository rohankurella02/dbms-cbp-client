import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from 'react-hook-form';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from '@mui/material/Tooltip';


function Student() {
    let [student, setStudent] = useState([])

    const [name, setName] = useState("");
    const [email_id, setEmail_id] = useState(0);
    const [roll_no, setRoll_no] = useState("");
    const [section, setSection] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm();
    const reload = () => {
        return "location.reload(true);";
    }

    const onSubmit = data => {
        addStudent(data.roll_no, data.name, data.section, data.email_id);
        alert("added Successfully");
        setTimeout("location.reload(true);", 100);

    };
    console.log(errors);

    const deleteStudent = (id) => {
        axios.delete(`http://localhost:3001/api/student/delete/${id}`)
        alert("Deleted Successfully")
        setTimeout("location.reload(true);", 100);
    }

    const addStudent = (roll_no, name, section, email_id) => {
        axios.post("http://localhost:3001/api/student/post", {
            roll_no: roll_no,
            name: name,
            section: section,
            email_id: email_id,
          
        }).then(() => {
          setStudent([
            ...student,
            {
                roll_no: roll_no,
                name: name,
                section: section,
                email_id: email_id,
            },
          ]);
        });
        setTimeout("location.reload(true);", 100);
      };

      useEffect(() => {
        axios.get(`http://localhost:3001/api/student/get`)
          .then(res => {
            const persons = res.data;
            setStudent(persons) 
          });
        }, []);


    return (
        <div>
            <div className="App">
            <div className="insertion w-75">
                <h2><AddCircleIcon /> Insert a Record</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input className="form-control mb-5" type="text" placeholder="Roll Number" {...register("roll_no", {required: true, maxLength: 120})} />
                    <input className="form-control mb-5" type="text" placeholder="Name" {...register("name", {required: true, min: -1, maxLength: 100})} />
                    <input className="form-control mb-5" type="text" placeholder="Section" {...register("section", {})} />
                    <input className="form-control mb-5" type="email" placeholder="Email" {...register("email_id", {required: true, pattern: /^\S+@\S+$/i})} />

                    <input className="btn2" type="submit" />
                </form>
            </div>
            <div className="data">
            <table class="table w-100">
        <thead class="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Roll Number</th>
            <th scope="col">Name</th>
            <th scope="col">Section</th>
            <th scope="col">Email ID</th>
            <th scope="col"> </th>
          </tr>
        </thead>
        <tbody>
          {
            student.map(student => <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.roll_no}</td>
              <td>{student.name}</td>
              <td>{student.section}</td>
              <td>{student.email_id}</td>
              <td><Tooltip title="Delete"><button className="icon" onClick={() => deleteStudent(student.id)}><DeleteIcon /></button></Tooltip> </td>
            </tr>)
          }
        </tbody>
      </table>
            </div>
        </div>
        </div>
    )
}

export default Student
