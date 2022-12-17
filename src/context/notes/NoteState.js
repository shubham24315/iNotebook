import react from "react";
import NoteContext from "./noteContext";
import { useState } from 'react';
const NoteState = (props) => {
  const host="http://localhost:5000"
const notesInitial=[]

const [notes, setNotes] = useState(notesInitial)
//ge all notes
const getNotes=async()=>{
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      "auth-token":localStorage.getItem('token')

    },

  });
  const json=await response.json();
  console.log(json)
  setNotes(json)
}
 //Add a note
const addNote=async(title,description,tag)=>{
  const response = await fetch(`${host}/api/notes/addnote`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      "auth-token":localStorage.getItem('token')

    },
    body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
  });
  const json=await response.json();
  console.log("adding a new note")
  const note=   json;
  setNotes(notes.concat(note))
}
 //Delete a note
const deleteNote=async(id)=>{
  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      "auth-token":localStorage.getItem('token')

    },
    // body data type must match "Content-Type" header
  });
  const json=response.json();
  console.log(json)
  console.log("deleting the note with id");
 const newNotes=notes.filter((note)=>{return note._id!==id})//if these condition is true then it will be there in the notes otherwise it will be not present
 setNotes(newNotes);

}
 //Edit a note
 const editNote=async(id,title,description,tag)=>{
  //API call

  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      "auth-token":localStorage.getItem('token')

    },
    body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
  });
  const json=await response.json();
  let newNotes=JSON.parse(JSON.stringify(notes))
  for (let index = 0; index < notes.length; index++) {
    const element = newNotes[index];
    if(element._id===id){
      newNotes[index].title=title;
      newNotes[index].description=description;
      newNotes[index].tag=tag;
      break;
    }

  }
  setNotes(newNotes)
 }
  return (
    <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
