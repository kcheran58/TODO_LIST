import React, { useState, useEffect } from 'react';
import './Todo.css';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3500/todo')
      .then((response) => { 
        console.log(response.data); // Log the response data
        setTodos(response.data);
      })
      .catch(err => { console.log(err) });
  }, []);
  
  const addTodo = () => {
    axios.post('http://localhost:3500/todo', { todo: text })
      .then(response => {
        console.log(response.data); // Log the response data
        setTodos([...todos, response.data]);
        setText('');
      })
      .catch(error => console.error(error));
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:3500/todo/${id}`) // Fixed delete URL
      .then(() => setTodos(todos.filter(todo => todo._id !== id))) // Use '_id'
      .catch(error => console.error(error));
  };

  return (
    <div className='body'>
      <h1>TODO LIST</h1>
      <br /><br />
      <div className='flex-container'>
        <input
          type='text'
          className='flex-item'
          id='input'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className='flex-item' id='button' type='submit' onClick={addTodo}>
          ADD
        </button>
        <br />
      </div>
      <br />
      <div>
        {todos.map(todo => (
          <ul key={todo._id}> {/* Use '_id' */}
            <li style={{ backgroundColor: 'green', width: '300px', height: '50px', color: 'white' }}>
              <input style={{ width: '20px', height: '20px', color: 'yellow' }} type='checkbox' />
              {todo.todo} {/* Use 'todo' */}
              <button onClick={() => deleteTodo(todo._id)}><DeleteIcon /></button> {/* Use '_id' */}
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default Todo;
