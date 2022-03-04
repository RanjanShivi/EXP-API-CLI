import Note from '../models/note.model';

//create new note
export const createNote = async (body) => {
  const data = await Note.create(body);
  return data;
    };

//get all notes
export const getAllNotes = async (userID) => {
    const data = await Note.find({userID});
    if(data.length === 0){
      throw new Error('No Note Found');
    } else{
      return data;
    }
  };

//get single notes
export const getNotebyId = async (noteID, userID) => {
    const data = await Note.findById({_id: noteID, userID: userID});
    console.log(data);
    return data;
  };
  
//update notes
export const updateNote = async (_id, body) => {
  const data = await Note.findByIdAndUpdate({_id},
    {Tittle: body.Tittle, Description: body.Description, Color: body.Color},
    {new: true});
  return data;
};

//is archieve
export const archieveNote = async (_id) => {
  const data = await Note.findByIdAndUpdate({_id}, {$set: { isArchived: true }}, {new: true} );
return data;
};

//trash Note
export const trashNote = async (_id) => {
  const data = await Note.findByIdAndUpdate({_id}, {$set: { isDeleted: true}}, {new: true} )
  return data;
};

//delete note
export const deleteNote = async (id) => {
    await Note.findByIdAndDelete(id);
    return '';
  };

  