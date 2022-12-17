import React from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
export default function Notes() {
  let navigate=useNavigate();
  const context = useContext(noteContext);
  const refClose=useRef(null)
  const { notes, getNotes,editNote } = context;
  const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:"default"})

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();     
    }
    else{
      navigate("/login");
    }
  }, []);
  let ref = useRef(null);
  const updateNote = (currntNote) => {
    ref.current.click();
    setNote({id:currntNote._id,etitle:currntNote.title,edescription:currntNote.description,etag:currntNote.tag});
  };
  const handleClick=(e)=>{
    e.preventDefault();//this is used so that page does not reload
    editNote(note.id,note.etitle,note.edescription,note.etag);
   refClose.current.click();
}
const onChange=(e)=>{
  setNote({...note,[e.target.name]:e.target.value})  
}
  return (
    <>
      <AddNote />

     
<button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label htmlFor="etitle" className="form-label">etitle</label>
    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle}
    onChange={onChange}/>
   
  </div>
  <div className="mb-3">
    <label htmlFor="edescription" className="form-label">eDescription</label>
    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription}
    onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="etag" className="form-label">eTag</label>
    <input type="text" className="form-control" id="etag" name="etag" value={note.etag}
    onChange={onChange} />
  </div>

</form>             
      </div>
      <div ref={refClose} className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
      </div>
    </div>
  </div>
</div>

      <div>
        <div className="container row my-3">
          <h1>Your notes</h1>
          {notes.length===0 && 'No notes to display'}
          {notes.map((note) => {
            return (
              <Noteitem key={note._id} note={note} updateNote={updateNote} />
            );
          })}
        </div>
      </div>
    </>
  );
}
