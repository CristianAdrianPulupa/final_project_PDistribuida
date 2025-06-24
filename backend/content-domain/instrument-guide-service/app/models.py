from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class InstrumentGuide(db.Model):
    __tablename__ = 'instrument_guides'
    id = db.Column(db.Integer, primary_key=True)
    instrument = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)