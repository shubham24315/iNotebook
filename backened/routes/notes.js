const express=require('express')
const router=express.Router()
var fetchuser=require('../middleware/fetchuser')
const Note=require('../models/Note')
const {body,validationResult}=require('express-validator');
//route1: get all the notes /api/notes/fetchallnotes
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try {
        const notes=await Note.find({user:req.user.id})
        res.json(notes)       
    } catch (error) {
        return res.status(400).json({error:"sorry a uset with this email alredy exists"})      
    }

})
//route 2:add a new note using post /api/notes/addnote
router.post('/addnote',fetchuser,[
    body('title').isLength({min:3}),
   
    body('description').isLength({min: 5}),
],async(req,res)=>{
    try {
        const {title,description,tag}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
         const note=new Note({// it will return a promise
        title,description,tag,user:req.user.id
         })
        const savedNote=await note.save();
        res.json(savedNote)        
    } catch (error) {
        return res.status(400).json({error:"sorry a user with this email alredy exists"})       
    }

 })

 
 //route3 update and existing note
 router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    try {
        const {title,description,tag}=req.body;
        //create a new note object
        const newNote={};
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag}; 
        
        //find the node to be updated
        let note=await Note.findById(req.params.id)
        if(!note){
         res.status(404).send("not found")
        }
        if(note.user.toString()!=req.user.id){
         return res.status(401).send("not allowed")
        }
        note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json({note});       
    } catch (error) {
        return res.status(400).json({error:"sorry a user with this email alredy exists"})          
    }

//    const note=Note.findByIdAndUpdate()
})
//route4 delete using DELETE
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
  try {
     //find the node to be deleted and delete it
     let note=await Note.findById(req.params.id)
     if(!note){
      res.status(404).send("not found")
     }
     //allows deletion if user owns this note
     if(note.user.toString()!=req.user.id){
      return res.status(404).send("not found")
     }
     note=await Note.findByIdAndDelete(req.params.id)
     res.json({"Sucess":"note had been deleted",note:note});   
  } catch (error) {
    return res.status(400).json({error:"sorry a user with this email alredy exists"})      
  }
    

 //    const note=Note.findByIdAndUpdate()
 })
module.exports=router