
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
    const welcomeNew = document.querySelector('#welcome-new');
    const welcomeSee = document.querySelector('#welcome-see');
    const btnCrear = document.querySelector('#btn-crear');
    const appLogo = document.querySelector('#app-logo');
    
    const welcomeScreen = document.querySelector('#welcome-screen');
    const crearNotasDiv = document.querySelector('.crearNotas');
    const verNotasDiv = document.querySelector('.container');
    
    const titleInput = document.querySelector('#titulo');
    const contentInput = document.querySelector('#contenido');
    const noteStats = document.querySelector('#note-stats');

    // Función para actualizar estadísticas
    const updateStats = async () => {
        try {
            const notes = await window.dbAPI.getNotes();
            const count = notes ? notes.length : 0;
            noteStats.innerHTML = `<p>Tienes un total de <b>${count}</b> ${count === 1 ? 'nota guardada' : 'notas guardadas'}</p>`;
        } catch (error) {
            console.error('Error updating stats:', error);
            noteStats.innerHTML = '<p>Error al cargar estadísticas</p>';
        }
    };

    updateStats();

    appLogo?.addEventListener('click', () => {
        welcomeScreen.style.display = 'flex';
        crearNotasDiv.style.display = 'none';
        verNotasDiv.style.display = 'none';
        updateStats();
    });

    btnNew?.addEventListener('click', () => {
        welcomeScreen.style.display = 'none';
        crearNotasDiv.style.display = 'flex';
        verNotasDiv.style.display = 'none';
    });

    welcomeNew?.addEventListener('click', () => {
        btnNew.click();
    });

    btnSee?.addEventListener('click', async () => {
        welcomeScreen.style.display = 'none';
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

    welcomeSee?.addEventListener('click', () => {
        btnSee.click();
    });

    btnCrear?.addEventListener('click', async () => {
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
            updateStats(); // Actualizar el contador de la home
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





