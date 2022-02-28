import express from 'express';
import * as noteController from '../controllers/note.controller';
import { newNoteValidator } from '../validators/validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

// Create a new Note
router.post('', newNoteValidator, userAuth, noteController.create);

// Retrieve all Notes
router.get('', userAuth, noteController.getAllNotes);

// Retrieve a single Note with noteId
router.get('/:_id', userAuth, noteController.getSingleNote);

// Update a Note with noteId
//router.put('/:_id', noteController.updateNote);

//isArchieve
//router.put('/archieve/:_id', noteController.updateNote);

//isdelete
//router.put('/delete/:_id', noteController.updateNote);


// Trash a Note with noteId
//router.delete('/:_id', noteController.deleteNote);

export default router;