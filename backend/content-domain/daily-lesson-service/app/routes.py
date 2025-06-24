from flask import Blueprint, request, jsonify
from .repository import LessonRepository

lesson_bp = Blueprint('lessons', __name__)

@lesson_bp.route('/lessons', methods=['GET'])
def get_lessons():
    lessons = LessonRepository.get_all()
    return jsonify([
        {
            "id": l.id,
            "title": l.title,
            "content": l.content,
            "date": l.date.isoformat()
        } for l in lessons
    ])

@lesson_bp.route('/lesson/today', methods=['GET'])
def get_today():
    lesson = LessonRepository.get_today()
    if lesson:
        return jsonify({
            "id": lesson.id,
            "title": lesson.title,
            "content": lesson.content,
            "date": lesson.date.isoformat()
        })
    return {"message": "No lesson found for today"}, 404

@lesson_bp.route('/lessons', methods=['POST'])
def create_lesson():
    data = request.json
    new = LessonRepository.add(data)
    return jsonify({
        "id": new.id,
        "title": new.title,
        "content": new.content,
        "date": new.date.isoformat()
    }), 201

@lesson_bp.route('/lessons/<int:lesson_id>', methods=['DELETE'])
def delete_lesson(lesson_id):
    deleted = LessonRepository.delete(lesson_id)
    return ({"message": "Deleted"} if deleted else {"error": "Not found"}), 200 if deleted else 404

@lesson_bp.route('/lessons/<int:lesson_id>', methods=['PUT'])
def update_lesson(lesson_id):
    data = request.json
    updated = LessonRepository.update(lesson_id, data)
    if updated:
        return jsonify({
            "id": updated.id,
            "title": updated.title,
            "content": updated.content,
            "date": updated.date.isoformat()
        }), 200
    else:
        return {"error": "Not found"}, 404
