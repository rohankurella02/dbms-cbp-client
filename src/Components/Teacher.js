import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from 'react-hook-form';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from '@mui/material/Tooltip';


function Teacher() {
    let [teacher, setTeacher] = useState([])

    const [name, setName] = useState("");
    const [email_id, setEmail_id] = useState(0);
    const [roll_no, setRoll_no] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        addTeacher(data.name, data.email_id, data.roll_no)
        alert("Added Successfully")
        setTimeout("location.reload(true)", 100);
    }


    const deleteTeacher = (id) => {
        axios.delete(`http://localhost:3001/api/teacher/delete/${id}`)
        alert("Deleted Successfully")
        setTimeout("location.reload(true)", 100);
    }

    const addTeacher = (name, email_id, roll_no) => {
        axios.post("http://localhost:3001/api/teacher/post", {
          name: name,
          email_id: email_id,
          roll_no: roll_no,
        }).then(() => {
          setTeacher([
            ...teacher,
            {
                name: name,
                email_id: email_id,
                roll_no: roll_no,
            },
          ]);
        });
        setTimeout("location.reload(true)", 100);
      };

  useEffect(() => {
    axios.get(`http://localhost:3001/api/teacher/get`)
      .then(res => {
        const persons = res.data;
        setTeacher(persons)
      });
    }, []);

  return (
    <div>
      <div className="App">
      
      <div className="insertion w-75">
      <h2><AddCircleIcon /> Insert a Record</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
              <input className="form-control mb-5" type="text" placeholder="Name" {...register("name", {required: true, min: -1, maxLength: 100})} />
              <input className="form-control mb-5" type="email" placeholder="Email" {...register("email_id", {required: true, pattern: /^\S+@\S+$/i})} />
              <input className="form-control mb-5" type="text" placeholder="JNTUH ID" {...register("roll_no", {required: true, maxLength: 120})} />

              <input className="btn2" type="submit" />
          </form>
      </div>
    <div className="data">
    <table class="table w-100">
      <thead class="thead-dark">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Email ID</th>
          <th scope="col">JNTUH ID</th>
          <th scope="col"> </th>
        </tr>
      </thead>
      <tbody>
        {
          teacher.map(teacher => <tr key={teacher.id}>
            <td>{teacher.id}</td>
            <td>{teacher.name}</td>
            <td>{teacher.email_id}</td>
            <td>{teacher.roll_no}</td>
            <td><Tooltip title="Delete"><button className="icon" onClick={() => deleteTeacher(teacher.id)}><DeleteIcon /></button></Tooltip> </td>
          </tr>)
        }
      </tbody>
    </table>
    </div>

        

  </div>
    </div>
  );
}

export default Teacher
