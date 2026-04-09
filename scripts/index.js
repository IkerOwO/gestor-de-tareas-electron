
// Botones que controlan las acciones de la ventana
document.addEventListener('DOMContentLoaded', () => {
    // Window controls
    document.querySelector('#btn-min')?.addEventListener('click', () => {
        window.windowAPI.minimize();
    });

    document.querySelector('#btn-max')?.addEventListener('click', () => {
        window.windowAPI.maximize();
    });

    document.querySelector('#btn-close')?.addEventListener('click', () => {
        window.windowAPI.close();
    });

    // App Navigation and DB Buttons
    const btnNew = document.querySelector('#btn-new');
    const btnSee = document.querySelector('#btn-see');
    const btnCrear = document.querySelector('#btn-crear');
    const crearNotasDiv = document.querySelector('.crearNotas');
    const verNotasDiv = document.querySelector('.container');
    const titleInput = document.querySelector('#titulo');
    const contentInput = document.querySelector('#contenido');

    btnNew?.addEventListener('click', () => {
        crearNotasDiv.style.display = 'flex';
        verNotasDiv.style.display = 'none';
    });

    btnCrear?.addEventListener('click', () => {
        const titleValue = titleInput.value;
        const contentValue = contentInput.value;

        if (titleValue === '' || contentValue === ''){
            alert('Por favor, complete todos los campos');
        } else{
            alert('Nota agregada');
            // Guardamos la nota en la base de datos
            window.dbAPI.addNote(titleValue, contentValue);
            titleInput.value = '';
            contentInput.value = '';
        }
    });

    btnSee?.addEventListener('click', async () => {
        crearNotasDiv.style.display = 'none';
        verNotasDiv.style.display = 'flex';
        verNotasDiv.innerHTML = '<h2 style="text-align: center;">Ver Notas</h2>';
        
        // Mostramos las notas sacadas de la BBDD
        try {
            const notes = await window.dbAPI.getNotes();
            if (notes && notes.length > 0) {
                notes.forEach((note) => {
                    verNotasDiv.innerHTML += `
                        <div class="note">
                            <h2>${note.titulo}</h2>
                            <p>${note.contenido}</p>
                            <button class="btn-delete" data-index="${note.id}"><i class="fa fa-trash"></i> Eliminar</button>
                        </div>
                    `;
                });
            } else {
                verNotasDiv.innerHTML += '<p style="text-align: center; color: #94a3b8;">No hay notas guardadas.</p>';
            }
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    });

    verNotasDiv?.addEventListener('click', (event) => {
        const deleteBtn = event.target.closest('.btn-delete');
        if (deleteBtn) {
            if (confirm('¿Estas seguro de eliminar la nota?')){
                const noteIndex = deleteBtn.getAttribute('data-index');
                window.dbAPI.deleteNote(noteIndex);
                btnSee.click(); // Recargar la lista de notas
            }
        }
    });
});





