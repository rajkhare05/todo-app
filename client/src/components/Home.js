import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Home() {
    const [toDos, setToDos] = useState([])
    const head_style = {
        padding: '5px 55px',
    }
    const todo_style = {
        padding: '2px 100px',
        fontSize: '18px'
    }
    useEffect(() => {
        axios.get('http://localhost:4000/todos')
            .then(res => {
                setToDos(res.data)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])
    
    return (
        <div>
            <h2 style={head_style}>Your ToDo(s)</h2>
            <ul style={todo_style}>
                {
                    toDos.map(toDo => <li key={toDo._id}>{toDo.todo}</li>)
                }
            </ul>
        </div>
    )
}

export default Home
