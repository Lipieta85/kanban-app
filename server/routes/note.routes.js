import { Router } from 'express';
import * as NoteController from '../controllers/note.controller';

const router = new Router();

// Add a new Note
router.route('/notes').post(NoteController.addNote);

// Delete a Note by noteId
router.route('/notes/:noteId').delete(NoteController.deleteNote);

// Get all Notes
router.route('/notes').get(NoteController.getNotes);

// Edit a Note by noteId
router.route('/notes/:noteId').put(NoteController.editNote);

// Change lane
//router.route('/note/:note-id/change-lane').put(NoteController.moveNote)

export default router;

