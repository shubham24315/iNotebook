import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Notes from './Notes';
const Home = () => {
  const context=useContext(noteContext);
  const {notes,setNotes}=context;

  return (
    <div > 



<Notes/>
</div>   
  
  )
}

export default Home