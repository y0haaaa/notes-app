import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getNotes, addNote } from './handlers/notes.js';
import { getNoteById } from './handlers/getNoteById.js';

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Скажем Express'у отдавать всё из папки public
app.use(express.static(path.join(__dirname, 'static')));

app.get('/notes', getNotes);
app.get('/notes/:id', getNoteById);
app.post('/notes/add', addNote);


app.listen(3000, () => {
  console.log('Сервер на Express работает на http://localhost:3000');
});