import mongoose from "mongoose";



const authorSchema= mongoose.Schema({
    name:{ type:String, required:true},
      books:[{ type:mongoose.Schema.Types.ObjectId, ref:"Book"}]
})

const bookSchema= mongoose.Schema({
    title:{
        type:String, required:true},
    author:{
        type:mongoose.Schema.Types.ObjectId, ref:"Author"
    }
})

const Author = mongoose.model("Author", authorSchema);

const Book = mongoose.model("Book", bookSchema);




// functions to create a book
const createBook =async(req,res)=>{
    try {

        const {title,author}= req.body
       const newBook= await new Book({
       title,
       author
            })

   const saveBook = newBook.save();
     if(!saveBook){
    return res.status(400).json({msg: "Failed to save book"})
}

    res.status(200).json({data:saveBook,status:true,message:'created sucesfully'})
        
    } catch (error) {
        console.log('error',error);
       res.status(500).json({data:null,message:error})
        
        
    }


}

createBook()


// find book and populate

const findBook = async(req,res)=>{
    try {
        const book = await Book.findById(req.params.id).populate('author');
        if(!book){
            return res.status(404).json({data:null,message:'book not found'})
        }
        res.status(200).json({data:book,status:true,message:'book found'})
        
    } catch (error) {
        console.log('error',error);
        res.status(500).json({data:null,message:error})
        
    }
}

findBook();

// pre save middleware when author is added

const author = new Author({name:'Danny'})
author.save();



