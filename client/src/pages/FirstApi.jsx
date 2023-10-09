import { useState } from 'react'
import axios from 'axios';

const App = () => {
  const [students, setstudents] = useState([]);
  const [users, setUsers] = useState([])

  const getStudents = async () => {
    const { data } = await axios.get('http://127.0.0.1:5000/class/students')
    console.log(data)
    setstudents(data)
  }


  const getUsers = async () => {
    const { data } = await axios.get('http://127.0.0.1:5000/class/users')
    console.log(data)
    setUsers(data)
  }

  return (
    <>
      <button onClick={getStudents}>Fetch Students</button>
      {
        students.map((student) => {
          return (
            <p key={student.Name}>Name:{student.name}-Grade:{student.grade}</p>
          )
        })
      }

      <button onClick={getUsers}>Fetch Users</button>
      {
        users.map((user) => {
          return (
            <p key={user.password}>firstName:{user.firstName}-LastName:{user.lastName}-emailAddress:{user.emailAddress}-phoneNumber:{user.phoneNumber}-password:{user.password}</p>
          )
        })
      }
    </>
  )
}

export default App
