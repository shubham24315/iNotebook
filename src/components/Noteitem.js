import React from 'react'
import noteContext from '../context/notes/noteContext';
import { useContext } from 'react';
export default function 
(props) {
    const context=useContext(noteContext);
    const {deleteNote}=context;
   const {note,updateNote}=props;
  return (
    <div className='col-md-3'>
         <div className="card my-3" >
    <div className="d-flex align-items-center">
    <h5 className="card-title">{note.title}</h5>  
    <i className="fa-solid fa-trash mx-2"  onClick={()=>{deleteNote(note._id)}}></i>
    <i className="fa-solid fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>      
    </div>
  <div className="card-body">

    <p className="card-text">{note.description}</p>

  </div>
</div>
    </div>
  )
}
