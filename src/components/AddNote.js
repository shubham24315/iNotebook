import React from 'react'
import Notes from './Notes'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import { useState } from 'react';
export default function AddNote() {
    const context=useContext(noteContext);
    const {addNote}=context;
    const [note, setNote] = useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
        e.preventDefault();//this is used so that page does not reload
       addNote(note.title,note.description,note.tag);
       setNote({title:"",description:"",tag:""})
    }
    const onChange=(e)=>{
      setNote({...note,[e.target.name]:e.target.value})  
    }
  return (
    <div>
       <h2>Add a note</h2>
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">title</label>
    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp"
    onChange={onChange} />
   
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" value={note.description} name="description"
    onChange={onChange} />
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" value={note.tag} name="tag"
    onChange={onChange} />
  </div>
  <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
</form>       
    </div>
  )
}
