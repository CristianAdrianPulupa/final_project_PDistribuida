from .models import DailyLesson, db
from datetime import date

class LessonRepository:
    @staticmethod
    def get_all():
        return DailyLesson.query.order_by(DailyLesson.date.desc()).all()

    @staticmethod
    def get_today():
        return DailyLesson.query.filter_by(date=date.today()).first()

    @staticmethod
    def add(data):
        lesson = DailyLesson(**data)
        db.session.add(lesson)
        db.session.commit()
        return lesson

    @staticmethod
    def delete(lesson_id):
        lesson = DailyLesson.query.get(lesson_id)
        if lesson:
            db.session.delete(lesson)
            db.session.commit()
            return True
        return False
    
    @staticmethod
    def update(lesson_id, data):
        lesson = DailyLesson.query.get(lesson_id)
        if not lesson:
            return None
        lesson.title = data.get('title', lesson.title)
        lesson.content = data.get('content', lesson.content)
        lesson.date = data.get('date', lesson.date)
        db.session.commit()
        return lesson