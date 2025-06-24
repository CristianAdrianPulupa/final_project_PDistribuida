from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Theory(db.Model):
    __tablename__ = 'theory'
    id = db.Column(db.Integer, primary_key=True)
    topic = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)