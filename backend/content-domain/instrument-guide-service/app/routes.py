from flask import Blueprint, request, jsonify
from .repository import GuideRepository

guides_bp = Blueprint('guides', __name__)

@guides_bp.route('/guides', methods=['GET'])
def get_guides():
    guides = GuideRepository.get_all()
    return jsonify([{"id": g.id, "instrument": g.instrument, "content": g.content} for g in guides])

@guides_bp.route('/guides', methods=['POST'])
def create_guide():
    data = request.json
    new = GuideRepository.add(data)
    return jsonify({"id": new.id, "instrument": new.instrument, "content": new.content}), 201

@guides_bp.route('/guides/<int:guide_id>', methods=['PUT'])
def update_guide(guide_id):
    data = request.json
    updated = GuideRepository.update(guide_id, data)
    if updated:
        return jsonify({
            "id": updated.id,
            "instrument": updated.instrument,
            "content": updated.content
        }), 200
    else:
        return {"error": "Not found"}, 404

@guides_bp.route('/guides/<int:guide_id>', methods=['DELETE'])
def delete_guide(guide_id):
    deleted = GuideRepository.delete(guide_id)
    return ({"message": "Deleted"} if deleted else {"error": "Not found"}), 200 if deleted else 404