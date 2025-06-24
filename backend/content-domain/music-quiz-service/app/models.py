from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Quiz(db.Model):
    __tablename__ = 'quizzes'
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(255), nullable=False)
    options = db.Column(db.JSON, nullable=False)
    answer = db.Column(db.String(100), nullable=False)