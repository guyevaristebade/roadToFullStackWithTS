import React from 'react'
import { Box, Container } from '.'
import { data } from '../utils'

export const Data : React.FC = () => {
  return (
    <Container className='grid'>
    {data.map(({text,link},index) =>(
      <Box key={index} text={text} link={link}/>
    ))}
  </Container>
  )
}
