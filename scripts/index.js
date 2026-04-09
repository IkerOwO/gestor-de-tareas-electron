// Botones que controlan las acciones de la ventana
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#btn-min').addEventListener('click', () => {
        window.windowAPI.minimize();
    });

    document.querySelector('#btn-max').addEventListener('click', () => {
        window.windowAPI.maximize();
    });

    document.querySelector('#btn-close').addEventListener('click', () => {
        window.windowAPI.close();
    });
});

const btnNew = document.querySelector('#btn-new');
const btnSee = document.querySelector('#btn-see');
const btnCrear = document.querySelector('#btn-crear');
const crearNotasDiv = document.querySelector('.crearNotas');
const verNotasDiv = document.querySelector('.container');
const titleInput = document.querySelector('#titulo');
const contentInput = document.querySelector('#contenido');

// TODO: CAMBIAR A BBDD EN VEZ DE UN ARRAY
var notes = [];

btnNew.addEventListener('click', () => {
    crearNotasDiv.style.display = 'flex';
    verNotasDiv.style.display = 'none';
});

btnCrear.addEventListener('click', () => {
    const titleValue = titleInput.value;
    const contentValue = contentInput.value;

    if (titleValue === '' || contentValue === ''){
        alert('Por favor, complete todos los campos');
    } else{
        alert('Nota agregada');
        notes.push({
            title: titleValue, 
            content: contentValue
        });
        console.log(notes);
        titleInput.value = '';
        contentInput.value = '';
    }
});

btnSee.addEventListener('click', () => {
    crearNotasDiv.style.display = 'none';
    verNotasDiv.style.display = 'flex';
    verNotasDiv.innerHTML = '<h2 style="text-align: center;">Ver Notas</h2>';
    notes.forEach((note, index) => {
        verNotasDiv.innerHTML += `
            <div class="note">
                <h2>${note.title}</h2>
                <p>${note.content}</p>
                <button class="btn-delete" data-index="${index}"><i class="fa fa-trash"></i> Eliminar</button>
            </div>
        `;
    });
});

verNotasDiv.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-delete')) {
        if (confirm('¿Estas seguro de eliminar la nota?')){
            const noteIndex = event.target.getAttribute('data-index');
            notes.splice(noteIndex, 1);
            btnSee.click(); // Recargar la lista de notas
        }
    }
});





