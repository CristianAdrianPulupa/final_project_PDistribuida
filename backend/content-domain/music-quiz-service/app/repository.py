from .models import Quiz, db

class QuizRepository:
    @staticmethod
    def get_all():
        return Quiz.query.all()

    @staticmethod
    def add(data):
        new_quiz = Quiz(**data)
        db.session.add(new_quiz)
        db.session.commit()
        return new_quiz

    @staticmethod
    def update(quiz_id, data):
        quiz = Quiz.query.get(quiz_id)
        if not quiz:
            return None
        quiz.question = data.get('question', quiz.question)
        quiz.options = data.get('options', quiz.options)
        quiz.answer = data.get('answer', quiz.answer)
        db.session.commit()
        return quiz

    @staticmethod
    def delete(quiz_id):
        quiz = Quiz.query.get(quiz_id)
        if quiz:
            db.session.delete(quiz)
            db.session.commit()
            return True
        return False