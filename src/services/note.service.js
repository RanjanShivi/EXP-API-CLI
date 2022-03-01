import Note from '../models/note.model';

//create new note
export const createNote = async (body) => {
  const data = await Note.create(body);
  return data;
    };

//get all notes
export const getAllNotes = async (userID) => {
    const data = await Note.find({userID});
    return data;
  };

//get single notes
export const getNotebyId = async (noteID, userID) => {
  
    const data = await Note.findById({_id: noteID, userID: userID});
    console.log(data);
    return data;
  };
  
//update notes
export const updateNote = async (noteID, body) => {
    const data = await Note.findByIdAndUpdate({_id:noteID, userID: body.userID}, body, {new: true});
    return data;
  };

//is archieve
export const archieveNote = async (_id) => {
  const data = await Note.findByIdAndUpdate(
  {
    _id
  },
   {
    $set: { isArchived: true }
  }
);
return data;
};

//is delete
export const deleteNote = async (_id) => {
  const data = await Note.findByIdAndUpdate(
    {
      _id
    },
     {
      $set: { isArchived: true }
    }
  );
  return data;
};

/*//delete note
export const trashNote = async (id) => {
    await Note.findByIdAndDelete(id);
    return '';
  };*/

  