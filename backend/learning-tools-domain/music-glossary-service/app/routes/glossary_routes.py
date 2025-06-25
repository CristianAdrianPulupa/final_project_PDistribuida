from flask import Blueprint, request, jsonify
from app import db
from app.models.term import Term

glossary_bp = Blueprint('glossary', __name__)

@glossary_bp.route('/', methods=['GET'])
def get_terms():
    terms = Term.query.all()
    return jsonify([{'id': t.id, 'term': t.term, 'definition': t.definition} for t in terms])

@glossary_bp.route('/', methods=['POST'])
def create_term():
    data = request.get_json()
    new_term = Term(term=data['term'], definition=data['definition'])
    db.session.add(new_term)
    db.session.commit()
    return jsonify({'id': new_term.id, 'term': new_term.term, 'definition': new_term.definition}), 201

@glossary_bp.route('/<int:id>', methods=['PUT'])
def update_term(id):
    term = Term.query.get_or_404(id)
    data = request.get_json()
    term.term = data.get('term', term.term)
    term.definition = data.get('definition', term.definition)
    db.session.commit()
    return jsonify({'id': term.id, 'term': term.term, 'definition': term.definition})

@glossary_bp.route('/<int:id>', methods=['DELETE'])
def delete_term(id):
    term = Term.query.get_or_404(id)
    db.session.delete(term)
    db.session.commit()
    return jsonify({'message': 'Término eliminado'})