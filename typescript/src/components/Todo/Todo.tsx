import React from 'react'
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

import './Todo.scss'

type SingleTodoType = {
    onDelete?: (id : number) => void;
    onChecked?: (id : number) => void;
    isEditable?: boolean;
    text: string;
    id? : number;
    completed?: boolean;
}

export const Todo : React.FC<SingleTodoType> = ({isEditable, onDelete, onChecked, text,id,completed} : SingleTodoType) => {
    
    return (
        <>
        {
            isEditable ? (
                <div>

                </div>
            ) : (
                <div className='todo'>
                    <input type="checkbox" checked={completed} />   
                    <p>{text}</p>
                    <div className='icon-action'>
                        <FaTrash className='trash' />
                        <MdEdit className='edit' />
                    </div>
                </div>
            )
        }
    </>
    )
}
