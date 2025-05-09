
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch('/notes');
        const notes = await res.json();
    
        const list = document.getElementById('notes-list');
        list.innerHTML = '';
    
        notes.forEach(note => {
        const item = document.createElement('div');
        item.className = 'note-item';
        item.setAttribute('data-id', note.id)
        item.innerHTML = `
            <div class="note-caption">${note.title}</div>
            <div class="note-description">${note.description}</div>
            <div class="note-delete"><svg viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>delete [#ffffff]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-179.000000, -360.000000)" fill="#ffffff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z" id="delete-[#ffffff]"> </path> </g> </g> </g> </g></svg></div>
        `;
        list.appendChild(item);
        });

    
    } catch (err) {
        console.error('Ошибка загрузки заметок:', err);
    }

    const firstNote  = document.querySelector('.note-item');
    if(!firstNote){firstNote.click();}

});

let note_id = 1
document.getElementById('notes-list').addEventListener('click', async (event) => {

    const noteItem = event.target.closest('.note-item');
    if (!noteItem) return; // Клик не по элементу заметки
    
    note_id = parseInt(noteItem.dataset.id);
    
    const deleteBtn = event.target.closest('.note-delete');
    if (deleteBtn) {
        try {
            const res = await fetch(`/notes/delete/${note_id}`, {
            method: 'DELETE',
            });

            if (!res.ok) throw new Error(`Ошибка запроса: ${res.status}`);
            console.log('Заметка удалена:', note_id);

            // Обнови UI, например:
            noteItem.remove(); // убираем из DOM
            return;

        } catch (err) {
            console.error('Ошибка при удалении заметки:', err);
        }
    }


    

    // Получаем заметку по id
    try {
        const res = await fetch(`/notes/${note_id}`);
        if (!res.ok) throw new Error(`Ошибка запроса: ${res.status}`);
        const note = await res.json();
  
        // Заполняем форму
        document.getElementById('note-caption-edit').value = note.title;
        document.getElementById('note-date').innerHTML = note.createdAt;
        document.getElementById('note-description-edit').value = note.description;
      } catch (err) {
        console.error('Ошибка при получении заметки:', err);
      }
    
});


document.getElementById('note-add').addEventListener('click', async () => {
    try {
        const res = await fetch('/notes/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({}) // Пустой объект, если не передаешь title/description
          });
        const notes = await res.json();
        const list = document.getElementById('notes-list');
        const item = document.createElement('div');
        item.className = 'note-item';
        item.setAttribute('data-id', notes.note.id)
        item.innerHTML = `
        <div class="note-caption">${notes.note.title}</div>
        <div class="note-description">${notes.note.description}</div>
        <div class="note-delete"><svg viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>delete [#ffffff]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-179.000000, -360.000000)" fill="#ffffff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z" id="delete-[#ffffff]"> </path> </g> </g> </g> </g></svg></div>
        `;
        list.appendChild(item);
  
    
      } catch (err) {
        console.error('Ошибка загрузки заметок:', err);
      }

});

document.getElementById('note-save').addEventListener('click', async () => {
    console.log(note_id)
    try {
        const res = await fetch(`/notes/update`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                    id: note_id,
                    title: document.getElementById('note-caption-edit').value,
                    description: document.getElementById('note-description-edit').value
   
            })
            
        });
        const result = await res.json();

        //  только одну заметку в DOM
        const updatedNote = result.note; 
        const noteDiv = document.querySelector(`.note-item[data-id="${updatedNote.id}"]`);
        if (noteDiv) {
          noteDiv.querySelector('.note-caption').textContent = updatedNote.title;
          noteDiv.querySelector('.note-description').textContent = updatedNote.description;
        }
    
      } catch (err) {
        console.error('Ошибка загрузки заметок:', err);
      }

});