const db = require('../config/db');

exports.getAllNotes = (req, res) => {
  db.all('SELECT * FROM notes', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.createNote = (req, res) => {
  const { name, frequency, description } = req.body;
  db.run('INSERT INTO notes (name, frequency, description) VALUES (?, ?, ?)',
    [name, frequency, description],
    function(err) {
      if (err) return res.status(400).json({ error: err.message });
      res.status(201).json({ id: this.lastID, name, frequency, description });
    }
  );
};

exports.updateNote = (req, res) => {
  const { name, frequency, description } = req.body;
  const { id } = req.params;
  db.run(
    'UPDATE notes SET name = ?, frequency = ?, description = ? WHERE id = ?',
    [name, frequency, description, id],
    function(err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id, name, frequency, description });
    }
  );
};

exports.deleteNote = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM notes WHERE id = ?', id, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Nota eliminada' });
  });
};