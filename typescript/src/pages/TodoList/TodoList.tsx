import React, { ChangeEvent, useEffect, useState } from 'react';
import { Container, Todo } from '../../components';
import './TodoList.scss';
import { storageServices, TodoType } from '../../utils';

export const TodoList: React.FC = () => {
    const [tasks, setTasks] = useState<TodoType[]>([]);
    const [task, setTask] = useState<string>("");

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (task.trim() !== '') {
            const todo : TodoType = storageServices.addTodos(task.trim());
            setTasks((prevTasks) => [...prevTasks, todo]); 
            setTask("");
        } else {
            alert("Veuillez remplir le champ");
        }
    };

    useEffect(() => {
        const todos: TodoType[] = storageServices.getTodos();
        setTasks(todos);
    }, []);

    useEffect(() => {
    }, []);

    return (
        <Container>
            <div className='wrapper-todo'>
                <div className="todo-title-container">
                    <h1>What TO DO ?</h1>
                </div>
                <form onSubmit={onSubmit}>
                    <input 
                        name='text' 
                        onChange={onChange} 
                        value={task} 
                        type="text" 
                        placeholder='Faire de la musique' 
                    />
                    <input type="submit"/>
                </form>
                <div className="todo-list">
                    {tasks.map((todo, index) => (
                        <Todo key={index} text={todo.text}/> // Affiche chaque tâche
                    ))}
                </div>
            </div>
        </Container>
    );
};
