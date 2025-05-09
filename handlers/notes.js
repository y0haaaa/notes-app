import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '..', 'data', 'db.json');

export async function getNotes(req, res) {
  const data = await fs.readFile(dbPath, 'utf-8');
  const notes = JSON.parse(data);
  res.json(notes);
}

export async function addNote(req, res) {
  const data = await fs.readFile(dbPath, 'utf-8');
  const notes = JSON.parse(data);

  const newNote = {
    id: Date.now(), // Используй время — просто, уникально
    title: req.body.title || 'Без заголовка',
    description: req.body.description || '',
    createdAt: new Date().toISOString(),
  };

  notes.push(newNote);

  await fs.writeFile(dbPath, JSON.stringify(notes, null, 2), 'utf-8');
  res.status(201).json({ message: 'Заметка добавлена', note: newNote });
}

export async function deleteNote(req, res) {
    const id = parseInt(req.params.id);
    const data = await fs.readFile(dbPath, 'utf-8');
    const notes = JSON.parse(data);
  
    const index = notes.findIndex(note => note.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Заметка не найдена' });
    }
  
    notes.splice(index, 1);
    await fs.writeFile(dbPath, JSON.stringify(notes, null, 2), 'utf-8');
    res.status(200).json({ message: 'Заметка удалена' });
  }
  
export async function updateNote(req, res) {
    const data = await fs.readFile(dbPath, 'utf-8');
    const notes = JSON.parse(data);
    const updatedNote = {
        id: req.body.id,
        title: req.body.title || 'Без заголовка',
        description: req.body.description || '',
        createdAt: new Date().toISOString(),
      };
    const index = notes.findIndex(note => note.id === req.body.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Заметка не найдена' });
    }
    if (index !== -1) {
        notes[index] = updatedNote;
      }


    await fs.writeFile(dbPath, JSON.stringify(notes, null, 2), 'utf-8');
    res.status(200).json({ message: 'Заметка изменена', note: updatedNote });

  }