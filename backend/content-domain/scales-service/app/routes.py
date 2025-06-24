from flask import Blueprint, request, jsonify
from .repository import ScaleRepository

scales_bp = Blueprint('scales', __name__)

@scales_bp.route('/scales', methods=['GET'])
def get_scales():
    scales = ScaleRepository.get_all()
    return jsonify([{"id": s.id, "name": s.name, "type": s.type, "notes": s.notes} for s in scales])

@scales_bp.route('/scales', methods=['POST'])
def create_scale():
    data = request.json
    new = ScaleRepository.add(data)
    return jsonify({"id": new.id, "name": new.name, "type": new.type, "notes": new.notes}), 201

@scales_bp.route('/scales/<int:scale_id>', methods=['DELETE'])
def delete_scale(scale_id):
    deleted = ScaleRepository.delete(scale_id)
    return ({"message": "Deleted"} if deleted else {"error": "Not found"}), 200 if deleted else 404

@scales_bp.route('/scales/<int:scale_id>', methods=['PUT'])
def update_scale(scale_id):
    data = request.json
    updated = ScaleRepository.update(scale_id, data)
    if updated:
        return jsonify({
            "id": updated.id,
            "name": updated.name,
            "type": updated.type,
            "notes": updated.notes
        }), 200
    else:
        return {"error": "Not found"}, 404
