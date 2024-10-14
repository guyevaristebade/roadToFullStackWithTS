import React, { useState } from 'react';

type MessageProps = {
    success?: boolean
    error?: boolean
    text : string,
}
export const Message : React.FC<MessageProps>  = ({success, error, text } : MessageProps) => {
    return (
        <div className='message-alert'>
            <div className="message">
                {text}
            </div>
        </div>
    )
}
