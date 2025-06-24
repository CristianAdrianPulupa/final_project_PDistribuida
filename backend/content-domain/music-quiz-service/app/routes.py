from flask import Blueprint, request, jsonify
from .repository import QuizRepository

quiz_bp = Blueprint('quiz', __name__)

@quiz_bp.route('/quizzes', methods=['GET'])
def get_quizzes():
    quizzes = QuizRepository.get_all()
    return jsonify([
        {
            "id": q.id,
            "question": q.question,
            "options": q.options,
            "answer": q.answer
        } for q in quizzes
    ])

@quiz_bp.route('/quizzes', methods=['POST'])
def create_quiz():
    data = request.json
    new = QuizRepository.add(data)
    return jsonify({
        "id": new.id,
        "question": new.question,
        "options": new.options,
        "answer": new.answer
    }), 201

@quiz_bp.route('/quizzes/<int:quiz_id>', methods=['PUT'])
def update_quiz(quiz_id):
    data = request.json
    updated = QuizRepository.update(quiz_id, data)
    if updated:
        return jsonify({
            "id": updated.id,
            "question": updated.question,
            "options": updated.options,
            "answer": updated.answer
        }), 200
    else:
        return {"error": "Not found"}, 404

@quiz_bp.route('/quizzes/<int:quiz_id>', methods=['DELETE'])
def delete_quiz(quiz_id):
    deleted = QuizRepository.delete(quiz_id)
    return ({"message": "Deleted"} if deleted else {"error": "Not found"}), 200 if deleted else 404