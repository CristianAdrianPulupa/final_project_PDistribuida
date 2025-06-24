from flask import Blueprint, request, jsonify
from .repository import TheoryRepository

theory_bp = Blueprint('theory', __name__)

@theory_bp.route('/theory', methods=['GET'])
def get_theory():
    theories = TheoryRepository.get_all()
    return jsonify([{"id": t.id, "topic": t.topic, "content": t.content} for t in theories])

@theory_bp.route('/theory', methods=['POST'])
def create_theory():
    data = request.json
    new = TheoryRepository.add(data)
    return jsonify({"id": new.id, "topic": new.topic, "content": new.content}), 201

@theory_bp.route('/theory/<int:theory_id>', methods=['PUT'])
def update_theory(theory_id):
    data = request.json
    updated = TheoryRepository.update(theory_id, data)
    if updated:
        return jsonify({
            "id": updated.id,
            "topic": updated.topic,
            "content": updated.content
        }), 200
    else:
        return {"error": "Not found"}, 404

@theory_bp.route('/theory/<int:theory_id>', methods=['DELETE'])
def delete_theory(theory_id):
    deleted = TheoryRepository.delete(theory_id)
    return ({"message": "Deleted"} if deleted else {"error": "Not found"}), 200 if deleted else 404