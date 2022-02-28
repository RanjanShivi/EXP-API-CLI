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

//get single note
export const getSingleNote = async (noteID, userID) => {
    const data = await Note.findById({noteID}, {userID});
    console.log(data);
    return data;
  };
  
//update note
export const updateNote = async (userID, body) => {
    const data = await Note.findByIdAndUpdate(
      {
        userID
      },
      body,
      {
        new: true
      }
    );
    return data;
  };

//is archieve
export const archieveNote = async (noteID, userID) => {
  const data = await Note.findByIdAndUpdate(
    { noteID },
    { userID },
    { $set: { isArchived: true } },
    );
  return data;
};

//is delete
export const deleteNote = async (noteID, userID) => {
  const data = await Note.findByIdAndUpdate(
    { noteID },
    { userID },
    { $set: { isDeleted: true } },
    );
  return data;
};

//delete note
export const trashNote = async (id) => {
    await Note.findByIdAndDelete(id);
    return '';
  };

  // User.find({region: "NA",sector:"Some Sector"}
  