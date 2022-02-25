import express from 'express';
import * as noteController from '../controllers/note.controller';
import { newNoteValidator } from '../validators/validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

// Create a new Note
router.post('', newNoteValidator, userAuth, noteController.create);

// Retrieve all Notes
//router.get('', userAuth, noteController.getAllNotes);

// Retrieve a single Note with noteId
//router.get('/:userID', userAuth, noteController.getSingleNote);

// Update a Note with noteId
//router.put('/:_id', noteController.updateNote);

//isArchieve
//router.put('/:_id', noteController.updateNote);

// Delete a Note with noteId
//router.delete('/:_id', noteController.deleteNote);

export default router;