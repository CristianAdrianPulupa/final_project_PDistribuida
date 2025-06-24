from .models import Chord, db

class ChordRepository:
    @staticmethod
    def get_all():
        return Chord.query.all()

    @staticmethod
    def add(chord_data):
        new_chord = Chord(**chord_data)
        db.session.add(new_chord)
        db.session.commit()
        return new_chord

    @staticmethod
    def delete(chord_id):
        chord = Chord.query.get(chord_id)
        if chord:
            db.session.delete(chord)
            db.session.commit()
            return True
        return False

    @staticmethod
    def update(chord_id, data):
        chord = Chord.query.get(chord_id)
        if not chord:
            return None
        chord.name = data.get('name', chord.name)
        chord.type = data.get('type', chord.type)
        chord.notes = data.get('notes', chord.notes)
        db.session.commit()
        return chord
