from .models import Theory, db

class TheoryRepository:
    @staticmethod
    def get_all():
        return Theory.query.all()

    @staticmethod
    def add(theory_data):
        new_theory = Theory(**theory_data)
        db.session.add(new_theory)
        db.session.commit()
        return new_theory

    @staticmethod
    def delete(theory_id):
        theory = Theory.query.get(theory_id)
        if theory:
            db.session.delete(theory)
            db.session.commit()
            return True
        return False

    @staticmethod
    def update(theory_id, data):
        theory = Theory.query.get(theory_id)
        if not theory:
            return None
        theory.topic = data.get('topic', theory.topic)
        theory.content = data.get('content', theory.content)
        db.session.commit()
        return theory