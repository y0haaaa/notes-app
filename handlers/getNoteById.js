import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '..', 'data', 'db.json');

export async function getNoteById(req, res) {
    const id = parseInt(req.params.id, 10);  // Приводим параметр к числу
    try {
      const data = await fs.readFile(dbPath, 'utf-8');
      const notes = JSON.parse(data);
  
      const note = notes.find(n => n.id === id);  // Теперь сравниваем числа
  
      if (!note) {
        return res.status(404).json({ error: 'Заметка не найдена' });
      }
  
      res.json(note);
    } catch (e) {
      console.error(e);  // Логируем ошибку для отладки
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  }