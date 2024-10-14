import React from 'react'
import { Link } from 'react-router-dom'
import './Box.scss'

type BoxProps = {
    text: string;
    link : string;
}
export const Box : React.FC<BoxProps> = ({ text, link }) => {
    return (
        <div className='box'>
            <Link className='link' to={link}>
                {text}
            </Link>
        </div>
    )
}
