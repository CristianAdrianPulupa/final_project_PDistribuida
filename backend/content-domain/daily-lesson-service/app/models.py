from flask_sqlalchemy import SQLAlchemy
from datetime import date

db = SQLAlchemy()

class DailyLesson(db.Model):
    __tablename__ = 'daily_lessons'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    date = db.Column(db.Date, default=date.today, nullable=False)