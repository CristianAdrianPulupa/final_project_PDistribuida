from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Chord(db.Model):
    __tablename__ = 'chords'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    notes = db.Column(db.String(200), nullable=False)
