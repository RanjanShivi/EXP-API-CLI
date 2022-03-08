import express from 'express';
import * as noteController from '../controllers/note.controller';
import { newNoteValidator } from '../validators/validator';
import {userAuthForNote } from '../middlewares/auth.middleware';
import {redis} from '../middlewares/redis.middleware';

const router = express.Router();

// Create a new Note
router.post('', newNoteValidator, userAuthForNote ,noteController.create);

// Retrieve all Notes
router.get('', userAuthForNote, redis, noteController.getAllNotes);

// Retrieve a single Note with noteId
router.get('/:_id', userAuthForNote, noteController.getNotebyId);

// Update a Note with noteId
router.put('/:_id', userAuthForNote, noteController.updateNote);

//isArchieve
router.put('/archive/:_id', userAuthForNote, noteController.archieveNote);

//trash
router.put('/trash/:_id', userAuthForNote, noteController.trashNote);

// Delete a Note 
router.delete('/:_id', userAuthForNote, noteController.deleteNote);

export default router;