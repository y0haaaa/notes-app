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