import { ChangeEvent, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import TodoTask from './components/TodoTask'
import { ITask } from './components/interface'
import Person from './components/Person'
import { MessageList } from './components/MessageList'
import { MessageStore } from './components/MessageStore'

function App() {

  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadline(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = {taskName: task, deadline: deadline };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDeadline(0);
  };

  const completeTask = (taskNametoDelete: string): void =>{
    setTodoList(todoList.filter((task) => {
      return task.taskName != taskNametoDelete
    }))
  };


  return (
    <div className="App">
      <div className='user'>
        <Person />
      </div>
      <div className='header'>
        <div className='inputContainer'>
          <input type='text' placeholder='Task..' value={task} name='task' onChange={handleChange} />
          <input type='number' placeholder='Deadline (in Days)'value={deadline} name='deadline' onChange={handleChange} />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className='todoList'>
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />
        })}
      </div>
      <div className='user'>
        <MessageList messageStore={MessageStore}/>
      </div>
    </div>
  )
}

export default App
