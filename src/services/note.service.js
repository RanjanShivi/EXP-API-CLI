import Note from '../models/note.model';

//create new note
export const create = async (body) => {
  const data = await Note.create(body);
  return data;
    };

//get all notes
export const getAllNotes = async () => {
    const data = await Note.find();
    return data;
  };

//get single note
export const getSingleNote = async (id) => {
    const data = await Note.findById(id);
    console.log(data);
    return data;
  };
  
//update note
export const updateNote = async (_id, body) => {
    const data = await Note.findByIdAndUpdate(
      {
        _id
      },
      body,
      {
        new: true
      }
    );
    return data;
  };

//is archieve
export const archieveNote = async (_id, body) => {
  const data = await Note.findByIdAndUpdate(
    {
      _id
    },
    { $set: { isArchived: true } },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete note
export const deleteNote = async (id) => {
    await Note.findByIdAndDelete(id);
    return '';
  };

  // User.find({region: "NA",sector:"Some Sector"}
  