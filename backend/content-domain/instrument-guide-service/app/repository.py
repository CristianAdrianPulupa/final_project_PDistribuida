from .models import InstrumentGuide, db

class GuideRepository:
    @staticmethod
    def get_all():
        return InstrumentGuide.query.all()

    @staticmethod
    def add(data):
        new_guide = InstrumentGuide(**data)
        db.session.add(new_guide)
        db.session.commit()
        return new_guide

    @staticmethod
    def update(guide_id, data):
        guide = InstrumentGuide.query.get(guide_id)
        if not guide:
            return None
        guide.instrument = data.get('instrument', guide.instrument)
        guide.content = data.get('content', guide.content)
        db.session.commit()
        return guide

    @staticmethod
    def delete(guide_id):
        guide = InstrumentGuide.query.get(guide_id)
        if guide:
            db.session.delete(guide)
            db.session.commit()
            return True
        return False