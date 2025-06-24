from flask import Blueprint, request, jsonify
from .repository import ChordRepository

chords_bp = Blueprint('chords', __name__)

@chords_bp.route('/chords', methods=['GET'])
def get_chords():
    chords = ChordRepository.get_all()
    return jsonify([{"id": c.id, "name": c.name, "type": c.type, "notes": c.notes} for c in chords])

@chords_bp.route('/chords', methods=['POST'])
def create_chord():
    data = request.json
    new = ChordRepository.add(data)
    return jsonify({"id": new.id, "name": new.name, "type": new.type, "notes": new.notes}), 201

@chords_bp.route('/chords/<int:chord_id>', methods=['DELETE'])
def delete_chord(chord_id):
    deleted = ChordRepository.delete(chord_id)
    return ({"message": "Deleted"} if deleted else {"error": "Not found"}), 200 if deleted else 404

@chords_bp.route('/chords/<int:chord_id>', methods=['PUT'])
def update_chord(chord_id):
    data = request.json
    updated = ChordRepository.update(chord_id, data)
    if updated:
        return jsonify({
            "id": updated.id,
            "name": updated.name,
            "type": updated.type,
            "notes": updated.notes
        }), 200
    else:
        return {"error": "Not found"}, 404
