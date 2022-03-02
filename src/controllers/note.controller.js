import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';

// Create new Note
export const create = async (req, res, next) => {
    try {
      req.body.userID = req.body.data.id;
      const data = await NoteService.createNote(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Note created successfully'
      });
    } catch (error) {
      next(error);
    }
  };

//retrieve all notes
export const getAllNotes = async (req, res, next) => {
    try {
        req.body.userID = req.body.data.id;
        const data = await NoteService.getAllNotes(req.body.userID);
        res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All notes fetched successfully'
    });
    }catch (error) {
        next(error);
    }
  };

//retrieve single note by id
export const getNotebyId = async (req, res, next) => {
    try {
      req.body.userID = req.body.data.id;
      const data = await NoteService.getNotebyId(req.params._id, req.body.userID);
      res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Note fetched successfully'
      });
    } catch (error) {
        next(error);
    }
  };

  //update note
  export const updateNote = async (req, res, next) => {
    try {
      req.body.userID = req.body.data.id;
      const data = await NoteService.updateNote(req.params._id, req.body.userID, req.body);
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'Note updated successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  export const archieveNote = async (req, res, next) => {
    try {
      req.body.userID = req.body.data.id;
      const data = await NoteService.archieveNote(req.params._id);
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'Note archieved successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  export const trashNote = async (req, res, next) => {
    try {
      req.body.userID = req.body.data.id;
      const data = await NoteService.trashNote(req.params._id);
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'Note move to trash successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  const deleteNote = async (req, res, next) => {
    try {
      req.body.userID = req.body.data.id;
      await NoteService.deleteNote(req.params._id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: [],
        message: 'Note deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };

