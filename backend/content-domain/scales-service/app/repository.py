
from .models import Scale, db

class ScaleRepository:
    @staticmethod
    def get_all():
        return Scale.query.all()

    @staticmethod
    def add(scale_data):
        new_scale = Scale(**scale_data)
        db.session.add(new_scale)
        db.session.commit()
        return new_scale

    @staticmethod
    def delete(scale_id):
        scale = Scale.query.get(scale_id)
        if scale:
            db.session.delete(scale)
            db.session.commit()
            return True
        return False
    
    @staticmethod
    def update(scale_id, data):
        scale = Scale.query.get(scale_id)
        if not scale:
            return None
        scale.name = data.get('name', scale.name)
        scale.type = data.get('type', scale.type)
        scale.notes = data.get('notes', scale.notes)
        db.session.commit()
        return scale

