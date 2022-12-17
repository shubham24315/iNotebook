const mongoose=require('mongoose');


// const connectToMongo =()=>{
//     mongoose.connect(mongoURI,()=>{
//         console.log("connected to mongo Successfully");
//     })
// }
const connectToMongo = async () => {
    await mongoose.connect('mongodb://localhost:27017/inotebook',{
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        family: 4,
  });
}
module.exports=connectToMongo;
