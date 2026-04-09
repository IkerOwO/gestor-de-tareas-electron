const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'notas.sqlite');
let db;

async function initDB() {
    const SQL = await initSqlJs();
    if (fs.existsSync(dbPath)) {
        const fileBuffer = fs.readFileSync(dbPath);
        db = new SQL.Database(fileBuffer);
    } else {
        db = new SQL.Database();
        db.run("CREATE TABLE notas (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, contenido TEXT);");
        saveDB();
    }
}

function saveDB() {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(dbPath, buffer);
}

function getNotes() {
    if (!db) return [];
    const notes = [];
    const stmt = db.prepare("SELECT * FROM notas");
    while(stmt.step()) {
        notes.push(stmt.getAsObject());
    }
    stmt.free();
    return notes;
}

function addNote(titulo, contenido) {
    db.run("INSERT INTO notas (titulo, contenido) VALUES (?, ?);", [titulo, contenido]);
    saveDB();
}

function deleteNote(id) {
    db.run("DELETE FROM notas WHERE id = ?;", [id]);
    saveDB();
}

module.exports = { initDB, getNotes, addNote, deleteNote };
