from app import db

class Term(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    term = db.Column(db.String(100), nullable=False)
    definition = db.Column(db.String(255), nullable=False)