import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import AddTaskIcon from '@mui/icons-material/AddTask'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Button from '@mui/material/Button'
import axios from 'axios'

function Home() {
    const [allToDos, setAllToDos] = useState([])
    const [toDo, setToDo] = useState('')
    const [update, setUpdate] = useState(true)

    const inputStyle = {
        marginLeft: '33vw',
        width: '400px'
    }
    const btnStyle = {
        height: '51px',
        margin: '4px 8px'
    }
    const head_style = {
        margin: '25px 70px',
    }
    const todo_style = {
        width: '80%',
        padding: '15px 100px',
        fontSize: '18px',
    }
    const it_style = {
        margin: '2px 44px',
        textAlign: 'justify',
        border: '1px solid blue'
    }

    const submitHandler = (e) => {
        e.preventDefault()
        toDo.trimRight()
        if (toDo.length < 2) return
        axios.post('http://localhost:4000/add', {
            todo: toDo
        })
            .then(() => {
                setToDo('')
                setUpdate(true)
            })
            .catch(err => {
                console.error(err)
            })
    }

    const deleteToDo = (id) => {
        axios.delete(`http://localhost:4000/delete/${id}`)
            .then(res => {
                if (res.data)
                    setUpdate(true)
            })
            .catch(err => {
                console.error(err)
            })
    }

    const setTime = (timeStr) => {
        let newTimeStr = ''
        let hr  = +timeStr.slice(0, 2) + 5
        let min = +timeStr.slice(3, 5) + 30
        let sec = +timeStr.slice(6, 9) + 12

        if (sec > 59){
            sec -= 60
            min += 1
        }
        if (min > 59){
            min -= 60
            hr += 1
        }
        if (hr > 12)
            hr -= 12
        
        newTimeStr += hr.toString()
        newTimeStr += ':' + min.toString() + ':'
        newTimeStr += sec.toString()

        if (hr > 12) newTimeStr += ' PM'
        else newTimeStr += ' AM'

        return newTimeStr
    }

    useEffect(() => {
        if (update) {
            axios.get('http://localhost:4000/todos')
                .then(res => {
                    setAllToDos(res.data)
                    setUpdate(false)
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }, [update])

    return (
        <div>
            <form onSubmit={submitHandler}>
                <TextField
                    style={inputStyle}
                    label='✅ write your todo here'
                    variant='filled'
                    color='secondary'
                    value={toDo}
                    onChange={(e) => setToDo(e.target.value.trimLeft())}
                    required
                />

                <Button
                    type='submit'
                    style={btnStyle}
                    variant='contained'
                    color='secondary'
                    size='large'
                    startIcon={<AddTaskIcon />}
                    disabled={!toDo}
                >
                    Add
                </Button>
            </form>
            <h2 style={head_style}>Your ToDo(s)</h2>
            <List style={todo_style}>
                {
                    allToDos.map(todo => (
                        <ListItem style={it_style} key={todo._id}>
                            <ListItemText primary={todo.todo} secondary={'created: ' + setTime(todo.createdAt.slice(11, 19))}/>
                            <IconButton color='primary' onClick={() => deleteToDo(todo._id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))
                }
            </List>
        </div>
    )
}

export default Home
